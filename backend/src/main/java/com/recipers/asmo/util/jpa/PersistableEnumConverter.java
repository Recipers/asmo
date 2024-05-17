package com.recipers.asmo.util.jpa;

import jakarta.persistence.AttributeConverter;
import java.util.EnumSet;
import java.util.Optional;

public class PersistableEnumConverter<E extends Enum<E> & PersistableEnum> implements
    AttributeConverter<E, String> {

    private Class<E> enumClass;

    PersistableEnumConverter(Class<E> enumClass) {
        this.enumClass = enumClass;
    }

    @Override
    public String convertToDatabaseColumn(E attribute) {
        return attribute.getCode();
    }

    @Override
    public E convertToEntityAttribute(String dbData) {
        Optional<E> matchedEnum = EnumSet.allOf(enumClass).stream()
            .filter(e -> e.getCode().equals(dbData)).findAny();
        if (matchedEnum.isEmpty()) {
            return null;
        }
        return matchedEnum.get();
    }

}
