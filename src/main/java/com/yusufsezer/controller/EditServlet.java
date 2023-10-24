package com.yusufsezer.controller;

import com.yusufsezer.model.Diary;
import com.yusufsezer.util.Helper;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.owasp.encoder.Encode;

public class EditServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        int diaryId = Integer.parseInt(request.getParameter("diary_id"));
        Diary foundDiary = Helper.diaryRepository().get(diaryId);

        if (foundDiary != null) {
            request.setAttribute("viewFile", "edit.jsp");

            DateFormat sdf = new SimpleDateFormat("YYYY-MM-dd");
            // encode the pageTitle before setting it as an attribute.
            String pageTitle = "Edit diary / " + Encode.forHtml(sdf.format(foundDiary.getDateOfDiary()));
            request.setAttribute("pageTitle", pageTitle);
            request.setAttribute("diary", foundDiary);

            Helper.view(request, response);
        } else {
            response.sendRedirect("mydiaries");
        }

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        int diaryId = Integer.parseInt(request.getParameter("diary_id"));
        Diary foundDiary = Helper.diaryRepository().get(diaryId);

        if (foundDiary != null) {

            String diaryContent = request.getParameter("diaryContent");
            // encode the diaryContent which is obtained from user inputs parameter before
            // setting it in the foundDiary object
            diaryContent = Encode.forHtml(diaryContent);
            boolean visible = request.getParameter("visible") != null;
            foundDiary.setContent(diaryContent);
            foundDiary.setVisibility(visible);

            Diary editResult = Helper.diaryRepository()
                    .update(foundDiary.getId(), foundDiary);

            if (editResult != null) {
                response.sendRedirect("mydiaries");
            } else {
                request.setAttribute("viewFile", "edit.jsp");
                DateFormat sdf = new SimpleDateFormat("YYYY-MM-dd");
                request.setAttribute("pageTitle", "Edit diary / "
                        + sdf.format(foundDiary.getDateOfDiary()));
                request.setAttribute("message", "Something went wrong");
                Helper.view(request, response);
            }
        } else {
            response.sendRedirect("mydiaries");
        }

    }
}
