package com.recipers.asmo.auth.token;

import com.recipers.asmo.auth.config.TokenConfig;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
@RequiredArgsConstructor
@Slf4j
public class TokenProvider {

    private final String USR_ID_KEY = "userId";

    private final TokenConfig tokenConfig;

    public Token issueToken(Claim claim) {

        return Token.builder()
            .accessToken(issueToken(tokenConfig.getAccessTokenExpireSeconds(), claim))
            .refreshToken(issueToken(tokenConfig.getRefreshTokenExpireSeconds(), claim)).build();
    }

    private String issueToken(long expireSeconds, Claim claim) {
        Date now = new Date();
        Date validDate = new Date(new Date().getTime() + expireSeconds);

        Map<String, Object> claims = new HashMap<>();
        claims.put(USR_ID_KEY, claim.getUserId());

        return Jwts.builder()
            .setClaims(claims)
            .setSubject(String.valueOf(claim.getUserId()))
            .setIssuedAt(now)
            .setExpiration(validDate)
            .signWith(SignatureAlgorithm.HS256, tokenConfig.getSecretKey())
            .compact();
    }

    public Optional<Long> validateToken(String token) {

        try {
            if (!isBearerTokenType(token)) {
                return Optional.empty();
            }
            token = token.replaceFirst(tokenConfig.getPrefix(), "");
            token = token.trim();

            Jws<Claims> claims = Jwts.parser().setSigningKey(tokenConfig.getSecretKey())
                .parseClaimsJws(token);
            if (claims.getBody().getExpiration().before(new Date())) {
                return Optional.empty();
            }
            return Optional.of(claims.getBody().get(USR_ID_KEY, Long.class));
        } catch (Exception e) {
            log.error("Token Provider ValidateToken occurs Exception : {}", e);
            return Optional.empty();
        }
    }

    private boolean isBearerTokenType(String token) {
        return StringUtils.hasText(token) && token.startsWith(tokenConfig.getPrefix());
    }

}
