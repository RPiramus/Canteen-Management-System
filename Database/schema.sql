DROP TABLE IF EXISTS OrderItems;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS MenuItems;
DROP TABLE IF EXISTS Restaurants;
DROP TABLE IF EXISTS User;

CREATE TABLE User (
    id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password  VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('admin', 'user')) DEFAULT 'user'
);

CREATE TABLE Restaurants (
    restaurant_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL
);

CREATE TABLE MenuItems (
    item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    restaurant_id INT,
    name VARCHAR(100) NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id)
);

CREATE TABLE Orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INT,
    restaurant_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount REAL NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'shipped', 'completed', 'canceled')) DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (restaurant_id) REFERENCES Restaurants(restaurant_id)
);

CREATE TABLE OrderItems (
    order_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INT,
    item_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (item_id) REFERENCES MenuItems(item_id)
);
