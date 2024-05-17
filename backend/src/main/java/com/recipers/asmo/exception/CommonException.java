package com.recipers.asmo.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class CommonException extends RuntimeException {

    private HttpStatus httpStatus;

    private ErrorMessageCode errorMessageCode;

    public CommonException(HttpStatus httpStatus, ErrorMessageCode errorMessageCode) {
        super(errorMessageCode.getErrorMessage());
        this.httpStatus = httpStatus;
        this.errorMessageCode = errorMessageCode;
    }

}
