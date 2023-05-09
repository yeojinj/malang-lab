package com.c102.malanglab.game.adapter.s3;

import com.c102.malanglab.game.application.port.out.S3Port;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class S3Adpater implements S3Port {

    private S3Uploader s3Uploader;

    @Override
    public String setImgPath(MultipartFile image) {
        return s3Uploader.uploadFile(image);
    }
}
