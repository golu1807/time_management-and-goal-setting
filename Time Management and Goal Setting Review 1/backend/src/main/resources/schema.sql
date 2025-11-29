CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  password_hash VARCHAR(255),
  role ENUM('USER','ADMIN') DEFAULT 'USER',
  status ENUM('ACTIVE','LOCKED') DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE goal_types (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  unit VARCHAR(20),
  default_target INT,
  color VARCHAR(7),
  active TINYINT(1) DEFAULT 1
);

CREATE TABLE goals (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT,
  goal_type_id BIGINT,
  name VARCHAR(255),
  target INT,
  unit VARCHAR(20),
  deadline DATE,
  tags VARCHAR(255),
  progress INT DEFAULT 0,
  status ENUM('ACTIVE','COMPLETED','ARCHIVED') DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE timelogs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT,
  goal_id BIGINT,
  start_time DATETIME,
  end_time DATETIME,
  duration_secs INT,
  tags VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
