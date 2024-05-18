package com.recipers.asmo.util.jpa;

import com.recipers.asmo.team_member.eums.Role;

public class EnumConverters {

    public static class RoleConverter extends PersistableEnumConverter<Role> {
        public RoleConverter() {
            super(Role.class);
        }
    }

}
