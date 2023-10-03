package com.yusufsezer.repository;

import com.yusufsezer.contracts.IDatabase;
import com.yusufsezer.contracts.IRepository;
import com.yusufsezer.model.User;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserRepository implements IRepository<User, Integer> {

    private final IDatabase database;

    public UserRepository(IDatabase database) {
        this.database = database;
    }

    @Override
    public User get(Integer index) {
        User user = null;
        String query = "SELECT * FROM user WHERE user_id = ?";

        try {
            // Create a PreparedStatement with parameter binding
            PreparedStatement preparedStatement = database.getConnection().prepareStatement(query);
            preparedStatement.setInt(1, index); // Bind the parameter

            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                user = new User();
                user.setId(resultSet.getInt("user_id"));
                user.setFirstName(resultSet.getString("first_name"));
                user.setLastName(resultSet.getString("last_name"));
                user.setEmail(resultSet.getString("email"));
                user.setPassword(resultSet.getString("password"));
            }
        } catch (Exception e) {
            return user;
        }

        return user;
    }

    @Override
    public List<User> getAll() {
        List<User> list = new ArrayList<>();
        String query = "SELECT * FROM user "
                + "ORDER BY user_id ASC";
        try {
            ResultSet resultSet = database.executeQuery(query);
            while (resultSet.next()) {
                User user = new User();
                user.setId(resultSet.getInt("user_id"));
                user.setFirstName(resultSet.getString("first_name"));
                user.setLastName(resultSet.getString("last_name"));
                user.setEmail(resultSet.getString("email"));
                user.setPassword(resultSet.getString("password"));
                list.add(user);
            }
        } catch (Exception ex) {
            return list;
        }
        return list;
    }

    @Override
    public boolean add(User user) {
        boolean result = false;
        try {
            Connection connection = database.getConnection();
            // binding parameters
            String query = "INSERT INTO user  VALUES (NULL, ?,?,?,?)";
            try (PreparedStatement preparedStatement = database.getConnection().prepareStatement(query)) {
                preparedStatement.setString(1, user.getFirstName());
                preparedStatement.setString(1, user.getLastName());
                preparedStatement.setString(1, user.getEmail());
                preparedStatement.setString(1, user.getPassword());
                preparedStatement.execute();
            } catch (Exception e) {
                return result;
            }
            result = true;
        } catch (Exception e) {

            return result;
        }
        return result;

    }

    @Override
    public User update(Integer index, User user) {
        User updatedUser = get(index);
        String query = String.format("UPDATE user SET "
                + "firstName = '%s', "
                + "lastName = '%s', "
                + "email = '%s', "
                + "password = '%s' "
                + "WHERE user_id = %d",
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPassword(),
                index);

        try {
            boolean result = (boolean) database.executeSQL(query);
            updatedUser = result ? updatedUser : user;
        } catch (Exception ex) {
            return updatedUser;
        }
        return updatedUser;
    }

    @Override
    public User remove(Integer index) {
        User deletedUser = get(index); // Retrieve the user before deletion
        String query = "DELETE FROM user WHERE user_id = ?";

        try (Connection connection = database.getConnection();
                PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, index); // Bind the parameter

            // Execute the DELETE statement
            preparedStatement.executeUpdate();
        } catch (Exception ex) {
            // Handle exceptions here
            ex.printStackTrace();
        }

        return deletedUser;

    }

    public User login(String email, String password) {
        User user = null;
        String query = String
                .format("SELECT * FROM user "
                        + "WHERE email = '%s' "
                        + "AND password = md5('%s')", email, password);
        try {
            ResultSet resultSet = database.executeQuery(query);
            while (resultSet.next()) {
                user = new User();
                user.setId(resultSet.getInt("user_id"));
                user.setFirstName(resultSet.getString("first_name"));
                user.setLastName(resultSet.getString("last_name"));
                user.setEmail(resultSet.getString("email"));
                user.setPassword(resultSet.getString("password"));
            }
        } catch (Exception e) {
            return user;
        }
        return user;
    }

}
