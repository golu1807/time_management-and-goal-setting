package com.timetrack.controller;

import com.timetrack.dao.UserDAO;
import com.timetrack.model.User;
import com.timetrack.util.JsonUtil;
import spark.Request;
import spark.Response;

public class AuthController {
    private static UserDAO userDAO = new UserDAO();

    public static Object login(Request req, Response res) {
        // TODO: implement login
        return "";
    }

    public static Object signup(Request req, Response res) {
        User user = JsonUtil.fromJson(req.body(), User.class);
        userDAO.save(user);
        res.status(201);
        return "";
    }
}
