package com.yusufsezer.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.net.ssl.HttpsURLConnection;

import com.google.gson.Gson;

public class HttpHelper {
    public String getResponse(HttpsURLConnection connection) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line + "\n");
        }
        br.close();
        return sb.toString();
    }

    public <T> T getResponse(HttpsURLConnection connection, Class<T> jsonType) throws IOException {
        String responseStr = getResponse(connection);
        return new Gson().fromJson(responseStr, jsonType);
    }
}
