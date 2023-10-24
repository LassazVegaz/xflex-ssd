package com.yusufsezer.controller;

import com.yusufsezer.util.Helper;
import com.yusufsezer.model.User;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ProfileServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        User loggedInUser = Helper.getLoginUser(request);
        if (loggedInUser != null) {
            int requestedUserId = Integer.parseInt(request.getParameter("user_id"));
            User requestedUser = Helper.userRepository().get(requestedUserId);

            // access other users' profiles and diaries

            if (requestedUser != null && loggedInUser.getId() == requestedUser.getId()) {
                // check The logged-in user is authorization
                request.setAttribute("viewFile", "profile.jsp");
                request.setAttribute("pageTitle", requestedUser.toString());
                request.setAttribute("diaryList", Helper.diaryRepository().getAllByUserId(requestedUserId, false));
                Helper.view(request, response);
            }
        } else {
            // User is not logged in. Redirect to the login page.
            response.sendRedirect("login");
        }
    }
}
