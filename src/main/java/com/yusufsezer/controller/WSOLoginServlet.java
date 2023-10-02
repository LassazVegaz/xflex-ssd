package com.yusufsezer.controller;

import java.io.IOException;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yusufsezer.model.User;
import com.yusufsezer.repository.UserRepository;
import com.yusufsezer.repository.WsoRepository;
import com.yusufsezer.repository.WsoRepository.UserData;
import com.yusufsezer.util.Helper;

public class WSOLoginServlet extends HttpServlet {
    private final UserRepository userRepository;

    public WSOLoginServlet() throws IOException {
        userRepository = Helper.userRepository();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            Helper helper = new Helper();
            Properties properties = helper.getProperties();
            String url = request.getServletPath();

            if (url.contains("wso_callback")) {
                WsoRepository wsoRepository = new WsoRepository();
                String code = request.getParameter("code");
                String token = wsoRepository.getToken(code);
                UserData userData = wsoRepository.getUserData(token);

                Boolean userExists = userRepository.isEmailExist(userData.email);
                if (Boolean.FALSE.equals(userExists)) {
                    User user = wsoRepository.convertUserDataToUser(userData);
                    userRepository.add(user);
                }

                User user = userRepository.getByEmail(userData.email);
                request.getSession().setAttribute("user", user);
                response.sendRedirect("mydiaries");
            } else {
                response.sendRedirect(
                        properties.getProperty("wso2.login_url"));
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
            request.setAttribute("viewFile", "server-error.jsp");
            Helper.view(request, response);
        }
    }
}
