package com.yusufsezer.controller;
import com.yusufsezer.model.User;
import com.yusufsezer.util.Helper;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class RegisterServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setAttribute("viewFile", "register.jsp");
        request.setAttribute("pageTitle", "Register");
        Helper.view(request, response);
    }
@Override
protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

    String firstName = request.getParameter("first_name");
    String lastName = request.getParameter("last_name");
    String email = request.getParameter("email");
    String password = request.getParameter("password");

    if (isValidInput(firstName) && isValidInput(lastName) && isValidEmail(email)) {
        // Input validation passed

        User newUser = new User();
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setEmail(email);
        newUser.setPassword(password);

        boolean registerResult = Helper.userRepository().add(newUser);
        if (registerResult) {
            response.sendRedirect("login");
        } else {
            request.setAttribute("message", "Registration failed. Please try again.");
            request.setAttribute("viewFile", "register.jsp");
            request.setAttribute("pageTitle", "Register");
            Helper.view(request, response);
        }
    } else {
        // Input validation failed
        request.setAttribute("viewFile", "register.jsp");
        request.setAttribute("message", "Please fill all fields correctly.");
        Helper.view(request, response);
    }
}

// Function to validate email format
private boolean isValidEmail(String email) {
    String regex = "^[A-Za-z0-9+_.-]+@(.+)$";
    return email != null && email.matches(regex);
}

// Function to validate input (not empty)
private boolean isValidInput(String input) {
    return input != null && !input.trim().isEmpty();
}
    
}
