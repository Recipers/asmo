package com.recipers.asmo.util.jpa;

import com.recipers.asmo.team_join.enums.TeamJoinStatus;
import com.recipers.asmo.team_member.eums.Role;

public class EnumConverters {

    public static class RoleConverter extends PersistableEnumConverter<Role> {
        public RoleConverter() {
            super(Role.class);
        }
    }

    public static class TeamJoinStatusConverter extends PersistableEnumConverter<TeamJoinStatus> {
        public TeamJoinStatusConverter() {
            super(TeamJoinStatus.class);
        }
    }

}
