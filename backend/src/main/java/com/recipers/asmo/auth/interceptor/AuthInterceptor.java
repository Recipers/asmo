package com.recipers.asmo.auth.interceptor;

import com.recipers.asmo.auth.token.TokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class AuthInterceptor implements HandlerInterceptor {

    private final TokenProvider tokenProvider;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
        Object handler) {

        String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        Optional<Long> nullableUserId = tokenProvider.validateToken(bearerToken);
        nullableUserId.ifPresent(AsmoSession.REQUEST_SCOPE::setUserId);
        return true;
    }

}
