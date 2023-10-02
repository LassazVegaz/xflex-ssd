package com.yusufsezer.controller;

import java.io.IOException;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yusufsezer.util.Helper;

public class WSOLoginServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Helper helper = new Helper();
        Properties properties = helper.getProperties();
        try {
            response.sendRedirect(
                    properties.getProperty("wso2_login_url"));
        } catch (Exception e) {
            System.err.println(e.getMessage());
            request.setAttribute("viewFile", "server-error.jsp");
        }
    }
}
