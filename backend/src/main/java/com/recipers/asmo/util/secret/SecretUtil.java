package com.recipers.asmo.util.secret;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class SecretUtil {

    public static String encryptPassword(String password) {

        return new BCryptPasswordEncoder().encode(password);
    }

    public static boolean matches(String password, String encodedPassword) {

        return new BCryptPasswordEncoder().matches(password, encodedPassword);
    }

}
