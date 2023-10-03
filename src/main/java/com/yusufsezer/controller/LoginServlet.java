package com.yusufsezer.controller;
import com.yusufsezer.model.User;
import com.yusufsezer.util.Helper;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoginServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setAttribute("viewFile", "login.jsp");
        request.setAttribute("pageTitle", "Login");
        Helper.view(request, response);
    }

    @Override
protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

    String email = request.getParameter("email");
    String password = request.getParameter("password");

    if (email == null || email.isEmpty() || password == null || password.isEmpty()) {
        request.setAttribute("viewFile", "login.jsp");
        request.setAttribute("message", "Please fill in both email and password fields.");
        Helper.view(request, response);
        return; // Stop processing further if input is invalid
    }

    // Validate the email format using a regex pattern
    String emailPattern = "^[A-Za-z0-9+_.-]+@(.+)$";
    if (!email.matches(emailPattern)) {
        request.setAttribute("viewFile", "login.jsp");
        request.setAttribute("message", "Invalid email format. Please enter a valid email address.");
        Helper.view(request, response);
        return; // Stop processing further if email format is invalid
    }

    User user = Helper.userRepository().login(email, password);

    if (user != null) {
        HttpSession session = request.getSession();
        session.setAttribute("user", user);
        response.sendRedirect("mydiaries");
    } else {
        request.setAttribute("message", "Invalid email or password. Please try again.");
        request.setAttribute("viewFile", "login.jsp");
        request.setAttribute("pageTitle", "Login");
        Helper.view(request, response);
    }
}
}
