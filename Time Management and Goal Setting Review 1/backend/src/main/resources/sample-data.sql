INSERT INTO users (name, email, password_hash, role) VALUES
('Admin User', 'admin@test.com', '$2a$12$D4E.i9g7Q2k6zJ9sT.f6UuY.p1.p1.p1.p1.p1.p1.p1.p1.p1.p1', 'ADMIN'),
('Test User 1', 'user1@test.com', '$2a$12$D4E.i9g7Q2k6zJ9sT.f6UuY.p1.p1.p1.p1.p1.p1.p1.p1.p1.p1', 'USER'),
('Test User 2', 'user2@test.com', '$2a$12$D4E.i9g7Q2k6zJ9sT.f6UuY.p1.p1.p1.p1.p1.p1.p1.p1.p1.p1', 'USER');

INSERT INTO goal_types (name, unit, default_target, color, active) VALUES
('Reading', 'Pages', 30, '#3498db', 1),
('Workout', 'Minutes', 60, '#e74c3c', 1),
('Coding', 'Hours', 2, '#2ecc71', 1);

INSERT INTO goals (user_id, goal_type_id, name, target, unit, deadline, tags, progress, status) VALUES
(2, 1, 'Read "The Pragmatic Programmer"', 320, 'Pages', '2024-12-31', 'books,programming', 50, 'ACTIVE'),
(2, 3, 'Finish TimeTrack Project', 40, 'Hours', '2024-07-30', 'java,project', 25, 'ACTIVE'),
(3, 2, 'Morning Run', 30, 'Minutes', '2024-12-31', 'health,fitness', 0, 'ACTIVE');

INSERT INTO timelogs (user_id, goal_id, start_time, end_time, duration_secs, tags, notes) VALUES
(2, 1, NOW() - INTERVAL 2 HOUR, NOW() - INTERVAL 1 HOUR, 3600, 'reading', 'Chapter 1'),
(2, 2, NOW() - INTERVAL 4 HOUR, NOW() - INTERVAL 2 HOUR, 7200, 'backend', 'Implemented DAO layer'),
(3, 3, NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY + INTERVAL 30 MINUTE, 1800, 'running', 'Easy 5k');
