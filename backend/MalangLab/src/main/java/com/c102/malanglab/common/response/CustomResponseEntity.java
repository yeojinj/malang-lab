package com.c102.malanglab.common.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CustomResponseEntity<T> {
    @JsonIgnore
    private HttpStatus httpStatus;
    private int status;
    private String message;
    private T data;

    public CustomResponseEntity(T data) {
        this(HttpStatus.OK, data);
    }
    public CustomResponseEntity(HttpStatus status) {
        this(status, null);
    }
    public CustomResponseEntity(HttpStatus status, T data) {
        this(status, "성공", data);
    }

    public CustomResponseEntity(HttpStatus status, String message, T data) {
        this.status = status.value();
        this.httpStatus = status;
        this.message = message;
        this.data = data;
    }

    public ResponseEntity<CustomResponseEntity<T>> convertToResponseEntity() {
        return ResponseEntity.status(this.httpStatus).body(this);
    }
}