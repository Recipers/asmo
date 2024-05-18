package com.recipers.asmo.auth.config;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "app.token")
@Data
@Slf4j
public class TokenConfig {

    private String secretKey;

    private String prefix;

    private long accessTokenExpireSeconds;

    private long refreshTokenExpireSeconds;

}
