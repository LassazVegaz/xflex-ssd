package com.yusufsezer.controller;

import com.yusufsezer.model.Diary;
import com.yusufsezer.util.Helper;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.owasp.encoder.Encode;

public class DetailServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String diaryIdParameter = request.getParameter("diary_id");
        // diaryId parameter is first checked to ensure it is a valid integer
        // (\\d+ is a regular expression pattern that matches one or more digits).
        if (diaryIdParameter != null && diaryIdParameter.matches("\\d+")) {
            int diaryId = Integer.parseInt(diaryIdParameter);
            Diary foundDiary = Helper.diaryRepository().get(diaryId);

            if (foundDiary != null) {
                request.setAttribute("viewFile", "detail.jsp");
                // sanitize pageTitle .This ensures that any special characters in
                // foundDiary.getDateOfDiary() are properly encoded
                request.setAttribute("pageTitle", Encode.forHtml(foundDiary.getDateOfDiary().toString()));
                request.setAttribute("diary", foundDiary);
            }
        }
        Helper.view(request, response);
    }
}
