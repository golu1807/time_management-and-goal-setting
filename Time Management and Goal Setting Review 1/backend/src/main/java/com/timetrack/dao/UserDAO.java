package com.timetrack.dao;

import com.timetrack.model.User;
import com.timetrack.util.DBConnectionManager;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class UserDAO {
    public void save(User user) {
        String sql = "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)";
        try (Connection conn = DBConnectionManager.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            // TODO: implement
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    // TODO: implement other CRUD methods
}
