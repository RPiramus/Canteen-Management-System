import React from "react";

export default function CartPanel({
    items,
    onChangeQuantity,
    onRemoveItem,
    onClearCart,
    TotalPrice,
    onPLaceOrder
}) {
    return (
        <div className="bg-white p-4 shadow-md rounded-md h-full flex flex-col">
            <h2 className="text-lg font-bold mb-3">🛒 Your Cart</h2>

            {/* list */}
            <div className="flex-1 overflow-auto space-y-3">
                {items.length === 0 && (
                <p className="text-gray-500 text-center">Cart is empty.</p>
                )}

                {items.map((item) => (
                <div
                    key={item.item_id}
                    className="border rounded p-2 flex justify-between items-center"
                >
                    <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                    <button
                        onClick={() =>
                        onChangeQuantity(item.item_id, item.quantity - 1)
                        }
                        className="px-2 border rounded"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                        onChangeQuantity(item.item_id, Number(e.target.value))
                        }
                        className="w-12 border rounded text-center"
                    />
                    <button
                        onClick={() =>
                        onChangeQuantity(item.item_id, item.quantity + 1)
                        }
                        className="px-2 border rounded"
                    >
                        +
                    </button>
                    <button
                        onClick={() => onRemoveItem(item.item_id)}
                        className="text-red-600 text-sm ml-2"
                    >
                        X
                    </button>
                    </div>
                </div>
                ))}
            </div>

            <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                <span>Subtotal:</span>
                <span>${TotalPrice.toFixed(2)}</span>
                </div>

                <div className="flex gap-2">
                <button
                    onClick={onClearCart}
                    disabled={items.length === 0}
                    className="flex-1 border rounded py-2"
                >
                    Clear
                </button>
                <button
                    onClick={onPLaceOrder}
                    disabled={items.length === 0}
                    className="flex-1 bg-purple-600 text-white rounded py-2 hover:bg-purple-700"
                >
                    Place Order
                </button>
                </div>
            </div>
        </div>
    );
}