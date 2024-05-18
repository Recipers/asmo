package com.recipers.asmo.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class CommonExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    private ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(
        MethodArgumentNotValidException e) {
        log.error("MethodArgumentNotValidException occur", e);
        String message = e.getBindingResult().getFieldErrors().stream().map(
            FieldError::getDefaultMessage).findFirst().get();
        ErrorResponse response = ErrorResponse.builder().message(message).build();
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = CommonException.class)
    private ResponseEntity<ErrorResponse> handleCommonException(CommonException e) {
        log.error("CommonException occur", e);
        ErrorResponse response = ErrorResponse.builder().message(e.getMessage()).build();
        return ResponseEntity.status(e.getHttpStatus()).body(response);
    }

    @ExceptionHandler(Exception.class)
    private ResponseEntity<ErrorResponse> handleException(Exception e) {
        log.error("Exception ", e);
        ErrorResponse response = ErrorResponse.builder().message(e.getMessage()).build();
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
