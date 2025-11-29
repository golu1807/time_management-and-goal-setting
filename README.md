Time Management & Goal Setting Tool

A smart productivity and progress-tracking system designed to help users set goals, manage time, and monitor progress effectively.

📌 Overview

The Time Management & Goal Setting Tool is a productivity-focused application that allows users to create goals, track time spent on each activity, and view their progress through a clean dashboard.
This system supports multi-user roles, including:

User: Sets goals, logs time, tracks progress

Admin: Manages users, configures goal parameters, monitors system activity

The project is built using a modular Java backend, web-based UI (HTML/CSS/JS), and a MySQL database connected through JDBC.

✨ Features
🔹 User Features

Create personal goals with deadlines

Add and manage time entries

Track progress visually

View a summarized dashboard of all goals and time logs

🔹 Admin Features

Manage user accounts

Configure goal categories and rules

Monitor system activity, users, and entries

🔹 Database Integration

MySQL-backed persistent storage

JDBC-based connection (property file configuration)

CRUD operations for users, goals, and time logs

Real-time syncing between backend & UI

🧱 System Architecture

The project follows a clean, maintainable structure:

Frontend

HTML

CSS

JavaScript

Backend

Java (Model, DAO, Service, UI, Util packages)

OOP-based modular architecture

Validation & exception handling

Database

MySQL

JDBC

SQL queries for CRUD operations

This ensures a clear separation of concerns and scalability.

🖥️ Frontend Screens

Dashboard: Overview of goals & time logs

Add Goal: Set name, target, and deadline

Time Tracking: Add time entries for each goal

Admin Panel: Manage users & goal categories

🛠 Backend Implementation

Model Classes: Goal, User, TimeEntry

DAO Layer: Communicates with MySQL

Service Layer: Applies business logic

UI Layer: Connects backend to frontend

Config Files: .properties & XML

Clean and readable OOP structure

🚀 Future Improvements

Notifications & reminders

Advanced analytics dashboard

Mobile app integration

Goal suggestions using AI

📜 Quote

“A goal without a plan is just a wish — and time is the bridge that turns wishes into reality.”
~ Govind Kumar

👥 Contributors

Govind Kumar

Akanksha Patel

Priyanshu Pandey
