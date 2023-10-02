package com.yusufsezer.controller;

import java.io.IOException;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yusufsezer.repository.WsoRepository;
import com.yusufsezer.util.Helper;

public class WSOLoginServlet extends HttpServlet {
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
                System.out.println("token: " + token);
                response.sendRedirect("profile");
            } else {
                response.sendRedirect(
                        properties.getProperty("wso2.login_url"));
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
            request.setAttribute("viewFile", "server-error.jsp");
        }
    }
}
