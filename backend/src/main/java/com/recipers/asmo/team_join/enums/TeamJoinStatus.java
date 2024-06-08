package com.recipers.asmo.team_join.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import com.recipers.asmo.util.jpa.PersistableEnum;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum TeamJoinStatus implements PersistableEnum {

    PENDING("대기", "1"),
    ACCEPTED("수락", "2"),
    REJECTED("거절", "9");

    private final String name;

    @JsonValue
    private final String code;

    @Override
    public String getCode() {
        return this.code;
    }

    @JsonCreator
    public static TeamJoinStatus of(String code) {
        for (TeamJoinStatus status : values()) {
            if (status.getCode().equals(code)) {
                return status;
            }
        }
        return null;
    }

}
