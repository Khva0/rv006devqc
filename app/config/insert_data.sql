use restaurant_db;
insert into roles(role) values('waiter'), ('admin'), ('manager'), ('cooker');
insert into statuses(status) values('Active'), ('Inactive'), ('Removed'), ('Pending'), ('Closed');
insert into users(f_name, l_name, login, password, email, id_status, id_role) values
('Jon', 'Collins', 'waiter', 'waiter', 'waiter@urk.net', 1, 3),
('Capitan', 'America', 'admin', 'admin', 'admin@yandex.ua', 1, 1),
('Linda', 'Haek', 'manager', 'manager', 'lindos@mail.ru', 1, 2),
('Ivan', 'Fast', 'cooker', 'cooker', 'cooker@gmail.com', 1, 4);
insert into categories(category) values
('Tea & Snacks'),
('Breakfast'),
('Indian Breads'),
('Soups'),
('Rice'),
('Fish'),
('Salad');
insert into dishes(name, description, price, image, id_status, count, id_category) values
('Tea', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 7, '/static/img/demoimg/28.jpg', 1, 10, 1),
('Coffe', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 7, '/static/img/demoimg/29.jpg', 1, 10, 1),
('Sprite', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 7, '/static/img/demoimg/30.jpg', 1, 10, 1),
('Bear', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 7, '/static/img/demoimg/31.jpg', 1, 10, 1),
('Milk', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 7, '/static/img/demoimg/1.jpg', 1, 10, 1),
('Coffee-Hot', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 10, '/static/img/demoimg/2.jpg', 1, 25, 1),
('Cream Coffee', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 25, '/static/img/demoimg/3.jpg', 1, 3, 1),
('Horlicks Hot', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 20, '/static/img/demoimg/5.jpg', 1, 8, 1),
('Samoosa', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 7, '/static/img/demoimg/6.jpg', 1, 6, 1),
('Bread with Butter & Jam', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 35, '/static/img/demoimg/7.jpg', 1, 10, 2),
('Bread with Omlet', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 40, '/static/img/demoimg/8.jpg', 1, 5, 2),
('Egg Sandwitch', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 40, '/static/img/demoimg/9.jpg', 1, 11, 2),
('Pappai Plate', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 30, '/static/img/demoimg/10.jpg', 1, 5, 2),
('Kerala Paratha', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 7, '/static/img/demoimg/11.jpg', 1, 15, 3),
('Chappathy', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 7, '/static/img/demoimg/12.jpg', 1, 10, 3),
('Appam', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 7, '/static/img/demoimg/13.jpg', 1, 9, 3),
('Butter Porotta', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 15, '/static/img/demoimg/14.jpg', 1, 7, 3),
('Sweet Corn Chicken Soup', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 40, '/static/img/demoimg/15.jpg', 1, 5, 4),
('Hot & Sour Chicken Soup', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 40, '/static/img/demoimg/16.jpg', 1, 4, 4),
('Tomato Soup', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 35, '/static/img/demoimg/17.jpg', 1, 8, 4),
('Meals', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 30, '/static/img/demoimg/18.jpg', 1, 30, 5),
('Ghee Rice', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 35, '/static/img/demoimg/19.jpg', 1, 6, 5),
('Plain Rice', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 40, '/static/img/demoimg/20.jpg', 1, 5, 5),
('Curd Rice', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 40, '/static/img/demoimg/21.jpg', 1, 4, 5),
('Fish Curry', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 60, '/static/img/demoimg/22.jpg', 1, 8, 6),
('Fish Roast', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 70, '/static/img/demoimg/23.jpg', 1, 11, 6),
('Chily Fish', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 80, '/static/img/demoimg/24.jpg', 1, 9, 6),
('Green Salad', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 35.5, '/static/img/demoimg/25.jpg', 1, 6, 7),
('Onion Salad', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 20, '/static/img/demoimg/26.jpg', 1, 15, 7),
('Tomatto Salad', 'Two mini sausages with sauerkraut served on soft buns with D?sseldorf mustard and German potato salad', 25.7, '/static/img/demoimg/27.jpg', 1, 8, 7);
insert into orders(date, id_status, id_user) values
(CONCAT(CURDATE(), ' ', CURTIME()), 4, 1),
(CONCAT(CURDATE(), ' ', CURTIME()), 4, 1),
(CONCAT(CURDATE(), ' ', CURTIME()), 4, 1),
(CONCAT(CURDATE(), ' ', CURTIME()), 4, 1),
(CONCAT(CURDATE(), ' ', CURTIME()), 4, 1),
(CONCAT(CURDATE(), ' ', CURTIME()), 4, 1),
(CONCAT(CURDATE(), ' ', CURTIME()), 4, 1);
insert into tickets(count, price, id_order, id_dish) values
(2, 45, 1, 1),
(2, 15, 1, 2),
(2, 25, 1, 3),
(3, 40, 2, 3),
(3, 65, 2, 8),
(2, 55, 3, 7),
(2, 55, 3, 12),
(2, 55, 3, 14);
