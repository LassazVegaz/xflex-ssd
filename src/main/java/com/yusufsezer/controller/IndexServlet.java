package com.yusufsezer.controller;

import com.yusufsezer.model.Diary;
import com.yusufsezer.model.User;
import com.yusufsezer.util.Helper;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.owasp.encoder.Encode;

public class IndexServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setAttribute("viewFile", "index.jsp");
        request.setAttribute("pageTitle", "Just Another Java JSP App...");

        // sanitize diaryList and userList(user generated contents) before setting them
        // as attributes
        List<Diary> diaryList = Helper.diaryRepository().getAll();
        List<User> userList = Helper.userRepository().getAll();

        // encode user-generated content in diaryList
        for (Diary diary : diaryList) {
            diary.setContent(Encode.forHtml(diary.getContent()));
        }

        // encode user-generated content in userList
        for (User user : userList) {
            user.setFirstName(Encode.forHtml(user.getFirstName()));

        }
        // set them as attributes after sanitizing
        request.setAttribute("diaryList", diaryList);
        request.setAttribute("userList", userList);

        Helper.view(request, response);
    }

}
