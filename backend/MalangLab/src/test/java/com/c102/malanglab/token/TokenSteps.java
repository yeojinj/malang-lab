package com.c102.malanglab.token;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

public class TokenSteps {

    public static ExtractableResponse<Response> 토큰생성요청() {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .post("/token")
                .then().log().all().extract();
    }

    public static ExtractableResponse<Response> 토큰정보요청(String token) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, token)
                .when()
                .get("/token")
                .then().log().all().extract();
    }
    public static ExtractableResponse<Response> 토큰갱신요청(String token) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, token)
                .when()
                .get("/token/refresh")
                .then().log().all().extract();
    }
    public static ExtractableResponse<Response> 토큰삭제요청(String token) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, token)
                .when()
                .delete("/token")
                .then().log().all().extract();
    }
}
