package com.c102.malanglab.game.application.port.out;

import org.springframework.web.multipart.MultipartFile;

public interface S3Port {
    String setImgPath(MultipartFile image, String path);

    void removeImgPath(String path);
}
