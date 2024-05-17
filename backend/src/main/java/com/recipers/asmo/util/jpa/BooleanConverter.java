package com.recipers.asmo.util.jpa;

import jakarta.persistence.AttributeConverter;
import org.springframework.util.StringUtils;

public class BooleanConverter implements AttributeConverter<Boolean, String> {

    @Override
    public String convertToDatabaseColumn(Boolean attribute) {

        if (attribute == null) {
            return null;
        }
        return Boolean.TRUE.equals(attribute) ? "Y" : "N";
    }

    @Override
    public Boolean convertToEntityAttribute(String dbData) {

        if (StringUtils.hasText(dbData)) {
            return null;
        }
        return "Y".equals(dbData) ? Boolean.TRUE : Boolean.FALSE;
    }
}