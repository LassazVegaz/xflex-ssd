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
    private final HttpHelper httpHelper = new HttpHelper();
    private final Properties properties;

    public WsoRepository() throws IOException {
        Helper helper = new Helper();
        properties = helper.getProperties();
    }

    public String getToken(String code) throws IOException {
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
        AuthResponse response = httpHelper.getResponse(connection, AuthResponse.class);
        return response.access_token;
    }

    public UserData getUserData(String token) throws IOException {
        String userInfoUrl = "https://localhost:9443/oauth2/userinfo?schema=openid";

        // send get request to userInfoUrl with token
        URL url = URI.create(userInfoUrl).toURL();
        HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.setDoOutput(true);

        connection.setRequestProperty("Authorization", "Bearer " + token);

        // get user data from response
        return httpHelper.getResponse(connection, UserData.class);
    }

    class AuthResponse {
        String access_token;
        String refresh_token;
        String scope;
        String token_type;
        int expires_in;
    }

    class UserData {
        String sub;
        String email;
        String website;
        String name;
        String family_name;
        String preferred_username;
        String given_name;
        String profile;
        String country;
    }
}
