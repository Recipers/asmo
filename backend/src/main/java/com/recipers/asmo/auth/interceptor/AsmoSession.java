package com.recipers.asmo.auth.interceptor;

public enum AsmoSession {

    REQUEST_SCOPE;

    ThreadLocal<Long> userId = new ThreadLocal<>();

    public Long getUserId() {
        return this.userId.get();
    }

    void setUserId(Long userId) {
        this.userId.set(userId);
    }

}
