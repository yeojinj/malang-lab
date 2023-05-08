package com.c102.malanglab.game;

import com.c102.malanglab.game.domain.GameMode;
import com.c102.malanglab.game.domain.Setting;
import com.c102.malanglab.game.dto.RoomRequest;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.List;

public class GameSteps {
    public static ExtractableResponse<Response> 게임생성요청(RoomRequest request, String token) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, token)
                .body(request)
                .when()
                .post("/game")
                .then().log().all().extract();
    }

    public static RoomRequest 게임생성요청_생성() {
        return new RoomRequest(
                "게임 생성 테스트",
                GameMode.SOLO,
                List.of(
                        new Setting("GOOGLE", "갓태민", Integer.valueOf(30),1),
                        new Setting("삼성", "갓여진", Integer.valueOf(60), 1),
                        new Setting("신한은행", "갓동준", Integer.valueOf(90), 1)
                ));
    }

    public static ExtractableResponse<Response> 게임조회요청(Long roomId, String token) {
        return RestAssured.given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, token)
                .when()
                .get("/game/{roomId}", roomId)
                .then().log().all().extract();
    }
}
