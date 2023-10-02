package com.yusufsezer.repository;

import java.io.IOException;
import java.net.URI;
import java.net.URL;
import java.util.Base64;
import java.util.Properties;

import javax.net.ssl.HttpsURLConnection;

import com.liferay.portal.kernel.util.URLStringEncoder;
import com.yusufsezer.util.Helper;
import com.yusufsezer.util.HttpHelper;

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
        HttpHelper httpHelper = new HttpHelper();
        AuthResponse response = httpHelper.getResponse(connection, AuthResponse.class);
        return response.access_token;
    }

    class AuthResponse {
        String access_token;
        String refresh_token;
        String scope;
        String token_type;
        int expires_in;
    }
}
