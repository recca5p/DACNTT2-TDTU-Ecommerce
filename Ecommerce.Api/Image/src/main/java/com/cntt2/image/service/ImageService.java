package com.cntt2.image.service;

import com.cntt2.image.model.Image;
import com.cntt2.image.repository.ImageRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;

    public String addPhoto(String title, MultipartFile file) throws IOException {
        Image photo = new Image(title);
        photo.setImage(
                new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        photo = imageRepository.insert(photo); return photo.getId();
    }

    public Image getPhoto(String id) {
        return imageRepository.findById(id).get();
    }
}
