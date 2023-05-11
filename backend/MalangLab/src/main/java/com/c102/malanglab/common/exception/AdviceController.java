package com.c102.malanglab.common.exception;

import com.c102.malanglab.common.response.CustomResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AdviceController {

    /**
     * IllegalArgumentException에 대해서 처리합니다.
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Void> badRequestExceptionHandler(final IllegalArgumentException ex) {
        return new CustomResponseEntity(HttpStatus.BAD_REQUEST, ex.getMessage(), null).convertToResponseEntity();
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<Void> HttpRequestMethodNotSupportExceptionHandler(final HttpRequestMethodNotSupportedException ex) {
        return new CustomResponseEntity(HttpStatus.METHOD_NOT_ALLOWED, "지원하지 않는 HTTP 요청방식입니다.", null).convertToResponseEntity();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Void> MethodArgumentNotValidExceptionHandler(final MethodArgumentNotValidException ex) {

        return new CustomResponseEntity(
                HttpStatus.BAD_REQUEST,
                ((FieldError) ex.getBindingResult().getAllErrors().get(0)).getField() + " : " +
                ex.getBindingResult().getAllErrors().get(0).getDefaultMessage(), null).convertToResponseEntity();
    }
}
