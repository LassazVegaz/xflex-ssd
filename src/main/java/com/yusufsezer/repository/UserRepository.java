package com.yusufsezer.repository;

import com.yusufsezer.contracts.IDatabase;
import com.yusufsezer.contracts.IRepository;
import com.yusufsezer.model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserRepository implements IRepository<User, Integer> {

    private final IDatabase database;

    public UserRepository(IDatabase database) {
        this.database = database;
    }

    @Override
    public User get(Integer index) {
        User user = null;
        String query = String
                .format("SELECT * FROM user WHERE user_id = %d", index);
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
            String query = "INSERT INTO user VALUES(NULL, ?, ?, ?, ?)";

            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setString(1, user.getFirstName());
                preparedStatement.setString(2, user.getLastName());
                preparedStatement.setString(3, user.getEmail());
                preparedStatement.setString(4, user.getPassword());
                preparedStatement.execute();
            } catch (Exception e) {
                return result;
            }

            result = true;
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
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
        String query = String
                .format("DELETE FROM user WHERE user_id = %d", index);
        User deletedUser = get(index);
        try {
            database.executeSQL(query);
        } catch (Exception ex) {
            return deletedUser;
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

    public boolean isEmailExist(String email) throws SQLException {
        boolean result = false;
        PreparedStatement preparedStatement = null;
        try {
            Connection connection = database.getConnection();
            String query = "SELECT * FROM user WHERE email = ?";
            preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, email);
            ResultSet resultSet = preparedStatement.executeQuery();
            result = resultSet.next();
        } catch (Exception e) {
            return result;
        } finally {
            if (preparedStatement != null)
                preparedStatement.close();
        }
        return result;
    }

    public User getByEmail(String email) throws SQLException {
        String query = "SELECT user_id FROM user WHERE email = ?";
        User user = null;
        PreparedStatement preparedStatement = null;
        try {
            Connection connection = database.getConnection();
            preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, email);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                user = get(resultSet.getInt("user_id"));
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        } finally {
            if (preparedStatement != null)
                preparedStatement.close();
        }
        return user;
    }
}
