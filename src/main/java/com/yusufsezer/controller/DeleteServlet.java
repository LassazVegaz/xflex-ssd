package com.yusufsezer.controller;

import com.yusufsezer.model.Diary;
import com.yusufsezer.model.User;
import com.yusufsezer.util.Helper;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DeleteServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        int diaryId = Integer.parseInt(request.getParameter("diary_id"));
        Diary foundDiary = Helper.diaryRepository().get(diaryId);

        // ensure that users can only delete their own diaries and not others
        User loginUser = Helper.getLoginUser(request);
        if (foundDiary != null && foundDiary.getUserId() == loginUser.getId()) {
            Helper.diaryRepository().remove(diaryId);
        }

        response.sendRedirect("mydiaries");
    }
}
