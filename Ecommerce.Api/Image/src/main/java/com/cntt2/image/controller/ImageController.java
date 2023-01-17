package com.cntt2.image.controller;

import com.cntt2.image.model.Image;
import com.cntt2.image.service.ImageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@Slf4j
@RestController
@RequestMapping("api/v1/image")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @GetMapping(path = "{id}")
    public ResponseEntity<Image> getPhoto(@PathVariable String id, Model model) {
        Image image = imageService.getPhoto(id);

        return new ResponseEntity<Image>(image, HttpStatus.OK);
    }

    @PostMapping
    public String addPhoto(@RequestParam("title") String title,
                           @RequestParam("image") MultipartFile image, Model model)
            throws IOException {
        String id = imageService.addPhoto(title, image);
        return "redirect:/photos/" + id;
    }
}
