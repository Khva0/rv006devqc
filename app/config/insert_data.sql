use restaurant_db;
insert into roles(role) values('waiter'), ('admin'), ('manager'), ('cooker');
insert into statuses(status) values('Active'), ('Inactive'), ('Removed'), ('Pending'), ('Closed');
insert into users(f_name, l_name, login, password, email, id_status, id_role) values
('Jon', 'Collins', 'waiter', 'waiter', 'waiter@urk.net', 1, 1),
('Capitan', 'America', 'admin', 'admin', 'admin@yandex.ua', 1, 2),
('Linda', 'Haek', 'manager', 'manager', 'lindos@mail.ru', 1, 3),
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
('Tea', '', 7, '', 1, 10, 1),
('Coffee-Hot', '', 10, '', 1, 25, 1),
('Cream Coffee', '', 25, '', 1, 3, 1),
('Horlicks Hot', '', 20, '', 1, 8, 1),
('Samoosa', '', 7, '', 1, 6, 1),
('Bread with Butter & Jam', '', 35, '', 1, 10, 2),
('Bread with Omlet', '', 40, '', 1, 5, 2),
('Egg Sandwitch', '', 40, '', 1, 11, 2),
('Pappai Plate', '', 30, '', 1, 5, 2),
('Kerala Paratha', '', 7, '', 1, 15, 3),
('Chappathy', '', 7, '', 1, 10, 3),
('Appam', '', 7, '', 1, 9, 3),
('Butter Porotta', '', 15, '', 1, 7, 3),
('Sweet Corn Chicken Soup', '', 40, '', 1, 5, 4),
('Hot & Sour Chicken Soup', '', 40, '', 1, 4, 4),
('Tomato Soup', '', 35, '', 1, 8, 4),
('Meals', '', 30, '', 1, 30, 5),
('Ghee Rice', '', 35, '', 1, 6, 5),
('Plain Rice', '', 40, '', 1, 5, 5),
('Curd Rice', '', 40, '', 1, 4, 5),
('Fish Curry', '', 60, '', 1, 8, 6),
('Fish Roast', '', 70, '', 1, 11, 6),
('Chily Fish', '', 80, '', 1, 9, 6),
('Green Salad', '', 35.5, '', 1, 6, 7),
('Onion Salad', '', 20, '', 1, 15, 7),
('Tomatto Salad', '', 25.7, '', 1, 8, 7);
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