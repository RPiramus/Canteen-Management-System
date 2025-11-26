from db import conn
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from passlib.context import CryptContext
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime

app = FastAPI()

class OrderItem(BaseModel):
    item_id: int
    quantity: int
    price: float

class OrderFull(BaseModel):
    user_id: int
    restaurant_id: int
    items: List[OrderItem]

class RestaurantCreated(BaseModel):
    name: str
    address: str

class MenuItemCreated(BaseModel):
    restaurant_id: int
    name: str
    price: float

app.add_middleware(
    CORSMiddleware,
    allow_origins=["localhost:3000", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


@app.post("/Login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    email = form_data.username
    password = form_data.password

    user = conn.execute(text("SELECT * FROM User WHERE email = :email"), {"email": email}).fetchone()
    if not user or not verify_password(password, user[3]):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    return {"user_id": user[0], "name": user[1], "email": user[2], "role": user[4]}

@app.get("/Restaurants")
def get_restaurants():
    rows = conn.execute(text("SELECT * FROM Restaurants")).fetchall()
    return [{"restaurant_id": r[0], "name": r[1], "address": r[2]} for r in rows]

@app.get("/MenuItems/{restaurant_id}")
def get_menus(restaurant_id: int):
    rows = conn.execute(text("SELECT * FROM MenuItems WHERE restaurant_id = :id"),
        {"id": restaurant_id}).fetchall()
    return [{"item_id": m[0], "restaurant_id": m[1], "name": m[2], "price": m[3]} for m in rows]

@app.get("/Orders/{user_id}")
def get_orders(user_id: int):
    row = conn.execute(text("SELECT * FROM Orders WHERE user_id = :uid"),{"uid": user_id}).fetchall()

    if not row:
        raise HTTPException(status_code=404, detail="Orders not found for the given user_id")
    
    return [{"order_id": o[0], "user_id": o[1], "restaurant_id": o[2], "order_date": o[3], "total_amount": o[4], "status": o[5]} for o in row]

@app.get("/OrderItems/{order_id}")
def get_order_items(order_id: int):
    rows = conn.execute(text("""
        SELECT mi.name, mi.price, oi.quantity
        FROM OrderItems oi
        JOIN MenuItems mi ON oi.item_id = mi.item_id
        WHERE oi.order_id = :oid
        """),
        {"oid": order_id}).fetchall()
    return [{"item": oi[0], "price": oi[1], "quantity": oi[2]} for oi in rows]

@app.post("/OrderFull")
def create_order(order : OrderFull):
    try:
        total = sum([item.price * item.quantity for item in order.items])

        result = conn.execute(text("""
                INSERT INTO Orders (user_id, restaurant_id, total_amount, status)
                VALUES (:uid, :rid, :total, 'pending')
            """),  {"uid": order.user_id, "rid": order.restaurant_id, "total": total},
        )

        conn .commit()

        order_id = result.lastrowid

        for i in order.items:
            conn.execute(text("""
                INSERT INTO OrderItems (order_id, item_id, quantity)
                VALUES (:oid, :iid, :qty)
            """), {"oid": order_id, "iid": i.item_id, "qty": i.quantity},
            )
        conn.commit()

        return {
            "order_id": order_id,
            "user_id": order.user_id,
            "restaurant_id": order.restaurant_id,
            "total_amount": total,
            "status": "pending",
        }
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail="Failed to create order") from e
    

@app.put("/Orders/{order_id}/status")
def update_order_status(order_id: int, status_update:dict):
    new_status = status_update.get("status")

    order = conn.execute(text("SELECT * FROM Orders WHERE order_id = :oid"), {"oid": order_id}).fetchone()

    conn.execute(
    text("UPDATE Orders SET status = :status WHERE order_id = :oid"),
    {"status": new_status, "oid": order_id},
    )

    conn.commit()
    
    return {
    "order_id": order_id,
    "new_status": new_status,
    "message": "Order status updated successfully",
    }

@app.post("/Restaurants")
def add_restaurant(restaurant: RestaurantCreated):
    try:
        conn.execute(
            text("INSERT INTO Restaurants (name, address) VALUES (:name, :address)"),
            {"name": restaurant.name, "address": restaurant.address},
        )
        conn.commit()
        return {"message": "Restaurant added successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to add restaurant: {e}")
    
@app.delete("/Restaurants/{restaurant_id}")
def delete_restaurant(restaurant_id: int):
    try:
        conn.execute(
            text("DELETE FROM Restaurants WHERE restaurant_id = :rid"),
            {"rid": restaurant_id},
        )
        conn.commit()
        return {"message": f"Restaurant {restaurant_id} deleted successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to delete restaurant: {e}")

@app.post("/MenuItems")
def add_menu_item(item: MenuItemCreated):
    try:
        conn.execute(
            text("""
                INSERT INTO MenuItems (restaurant_id, name, price)
                VALUES (:rid, :name, :price)
            """),
            {"rid": item.restaurant_id, "name": item.name, "price": item.price},
        )
        conn.commit()
        return {"message": "Menu item added successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to add item: {e}")
    
@app.delete("/MenuItems/{item_id}")
def delete_menu_item(item_id: int):
    try:
        conn.execute(
            text("DELETE FROM MenuItems WHERE item_id = :id"),
            {"id": item_id},
        )
        conn.commit()
        return {"message": f"Menu item {item_id} deleted successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to delete item: {e}")
    
@app.get("/Orders")
def get_all_orders():
    rows = conn.execute(text("SELECT * FROM Orders")).fetchall()
    return [
        {
            "order_id": o[0],
            "user_id": o[1],
            "restaurant_id": o[2],
            "order_date": o[3],
            "total_amount": o[4],
            "status": o[5],
        }
        for o in rows
    ]
