DELETE FROM OrderItems;
DELETE FROM Orders;
DELETE FROM MenuItems;
DELETE FROM Restaurants;
DELETE FROM User;

INSERT INTO User (id, username, email, password, role) VALUES
(1, 'Alice Wong', 'alice@cuhk.edu.com', '$2b$12$b8IorllRCEpyMhxofkZBkuHLSY2gW63GKJtMZyuz6M7jBZEw0GoOW', 'user'),
(2, 'Bob Chen', 'bob@cuhk.edu.com', '$2b$12$7z1v3kJczh2e25aAhrLUy.l2gWmQbXigDz5vjnWXZuYcIarS2ReGa', 'user'),
(3, 'Admin', 'admin@cuhk.edu.com', '$2b$12$30K.qDDMT7pqHX2cWRT/PuDV1XF4rIUvQtiOpmSHbiJYEZ52ZMgYK', 'admin'),
(4, 'Charlie Zhang', 'charlie@cuhk.edu.com', '$2b$12$g8Oo0DjRTocM.VYjDCOfuOVh68w0Dqwt458yIchZtMiEqyUhn6uLm', 'user'),
(5, 'Diana Lee', 'diana@cuhk.edu.com', '$2b$12$hYQEyYRfrby7YiCfxEA91uXLX2QNH0EInJWBAzQoq0tQxLGgDlS22', 'user'),
(6, 'Ethan Liu', 'ethan@cuhk.edu.com', '$2b$12$5Nkh/i7h3sh0n0gegxP9HOJ260WyhOyiyu7ZsdCxk8rihMam4DvDO', 'user'),
(7, 'Fiona Tan', 'fiona@cuhk.edu.com', '$2b$12$rvv.Px90E3qizDp1RugDpu7jZZcH8TEWVMtMlVNrF3ZEO4MFVo1Em', 'user'),
(8, 'Grace Ho', 'grace@cuhk.edu.com', '$2b$12$rxwoI.AZ1PFnBHaJDkAp3eXPEAOrXFLTW5C8uWjB8NJQ9U60qJgcy', 'user'),
(9, 'Henry Wu', 'henry@cuhk.edu.com', '$2b$12$E0ETJUKCt.0izXQo.uEkC..rXYWlwE/3WfmhoN4GW.7BDA.LlRZtK', 'admin'),
(10, 'Isabella Ng', 'isabella@cuhk.edu.com', '$2b$12$Da3bXbZsp7hf/9vc7bZbmOY9jlTyiKGi7cuRR9tRwXnNWwfpQAssy', 'admin');

INSERT INTO Restaurants (restaurant_id, name, address) VALUES
(1, 'Pizza Palace', 'Muse canteen'),
(2, 'Sushi Central', 'Shaw canteen'),
(3, 'Burger Town', 'Minerva canteen'),
(4, 'Sichuan House', 'Student Center canteen'),
(5, 'HALAL Stall', 'Harmonia canteen');

INSERT INTO MenuItems (restaurant_id, name, price) VALUES
(1, 'Pepperoni Pizza', 12.99),
(1, 'Veggie Pizza', 11.99),
(1, 'Margherita Pizza', 9.99),
(1, 'Cheese Pizza', 10.99),
(1, 'Garlic Bread', 5.50),

(2, 'Salmon Sushi', 15.00),
(2, 'California Roll', 10.00),
(2, 'Spicy bacon Roll', 13.00),
(2, 'Tuna Roll', 12.00),
(2, 'Miso Soup', 4.50),

(3, 'Classic Burger', 9.99),
(3, 'Veggie Burger', 8.99),
(3, 'Chicken Burger', 9.49),
(3, 'Cheeseburger', 10.99),
(3, 'French Fries', 3.99),

(4, 'Kung Pao Chicken', 13.50),
(4, 'Sweet and Sour Pork', 12.00),
(4, 'Fried Rice', 9.00),
(4, 'Spring Rolls', 6.00),
(4, 'Mapo Tofu', 11.00),
(4, 'Dumplings', 7.50),

(5, 'Chicken Biryani', 10.00),
(5, 'Lamb Curry', 14.00),
(5, 'Hummus Plate', 7.50),
(5, 'Beef Kebab', 12.00),
(5, 'Falafel Wrap', 8.50);
