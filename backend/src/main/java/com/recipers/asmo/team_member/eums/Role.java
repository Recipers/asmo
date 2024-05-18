package com.recipers.asmo.team_member.eums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import com.recipers.asmo.util.jpa.PersistableEnum;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@AllArgsConstructor
public enum Role implements PersistableEnum {

    MANAGER("매니저", "1"),
    COACH("코치", "2"),
    MEMBER("멤버", "3");

    private String name;

    @JsonValue
    private String code;

    @Override
    public String getCode() {
        return this.code;
    }

    @JsonCreator
    public static Role of(String code) {
        for (Role role : values()) {
            if (role.getCode().equals(code)) {
                return role;
            }
        }
        return null;
    }

}
