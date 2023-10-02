package com.yusufsezer.repository;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.URL;
import java.util.Base64;
import java.util.Properties;

import javax.net.ssl.HttpsURLConnection;

import com.google.gson.Gson;
import com.liferay.portal.kernel.util.URLStringEncoder;
import com.yusufsezer.util.Helper;

public class WsoRepository {
    public String getToken(String code) throws IOException {
        Helper helper = new Helper();
        Properties properties = helper.getProperties();
        String tokenUrl = properties.getProperty("wso2.token_url");
        String redirectUrl = properties.getProperty("wso2.redirect_url");
        String clientId = properties.getProperty("wso2.client_id");
        String clientSecret = properties.getProperty("wso2.client_secret");

        // auth = Basic base64(clientId:clientSecret)
        String auth = clientId + ":" + clientSecret;
        auth = "Basic " + Base64.getEncoder().encodeToString(auth.getBytes());

        // url encode redirectUrl
        redirectUrl = new URLStringEncoder().encode(redirectUrl);

        // send post request to tokenUrl with code
        URL url = URI.create(tokenUrl).toURL();
        HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setDoOutput(true);

        connection.setRequestProperty("Authorization", auth);
        connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

        String body = String.format(
                "grant_type=authorization_code&code=%s&redirect_uri=%s",
                code, redirectUrl);

        connection.getOutputStream().write(body.getBytes());

        // get access_token from response
        String responseStr = getResponse(connection);
        AuthResponse response = new Gson().fromJson(responseStr, AuthResponse.class);
        return response.access_token;
    }

    private String getResponse(HttpsURLConnection connection) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            sb.append(line + "\n");
        }
        br.close();
        return sb.toString();
    }

    class AuthResponse {
        String access_token;
        String refresh_token;
        String scope;
        String token_type;
        int expires_in;
    }
}
