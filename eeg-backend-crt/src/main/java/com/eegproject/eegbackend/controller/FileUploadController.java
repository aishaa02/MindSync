package com.eegproject.eegbackend.controller;

import com.eegproject.eegbackend.model.FileMetadata;
import com.eegproject.eegbackend.repository.FileMetadataRepository;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;
import java.util.HashMap;


import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("myapp/api/eeg")
@CrossOrigin
public class FileUploadController {

    private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);

    @Autowired
    private GridFsTemplate gridFsTemplate;

    @Autowired
    private FileMetadataRepository fileMetadataRepository;

    // Allowed features
    private static final List<String> ALLOWED_FEATURES = Arrays.asList("emotion", "lie", "seizure");

    @PostMapping("/{feature}/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file,
                                        @PathVariable String feature,
                                        @RequestHeader(value = "userId", required = false) String userId) {
        logger.info("Received file upload request for feature: {}", feature);

        // Validate feature
        if (!ALLOWED_FEATURES.contains(feature)) {
            logger.warn("Invalid feature: {}", feature);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("{\"error\": \"Invalid feature. Allowed features are: " + ALLOWED_FEATURES + "\"}");
        }

        // Validate file
        if (file.isEmpty()) {
            logger.warn("Upload failed: No file selected.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("{\"error\": \"Please select a file to upload.\"}");
        }

        // Validate userId
        if (userId == null || userId.isEmpty()) {
            logger.warn("Upload failed: Missing userId.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("{\"error\": \"User ID is missing in the request headers.\"}");
        }

        try {
            // Save file to MongoDB GridFS
            ObjectId fileId = gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType());

            // Save file metadata
            FileMetadata metadata = new FileMetadata();
            metadata.setFileName(file.getOriginalFilename());
            metadata.setFeature(feature);
            metadata.setUserId(userId);
            metadata.setUploadDate(new Date());
            metadata.setFileId(fileId.toString());
            fileMetadataRepository.save(metadata);

            
            logger.info("File uploaded successfully for feature {}: {}", feature, fileId.toString());
            //return ResponseEntity.ok("{\"message\": \"File uploaded successfully\", \"fileId\": \"" + fileId.toString() + "\"}");
           Map<String, String> response = new HashMap<>();
           response.put("message", "File uploaded successfully");
           response.put("fileId", fileId.toString());
           response.put("fileName", file.getOriginalFilename());
        

           return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            logger.error("Runtime exception while uploading file for feature {}: {}", feature, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"Runtime exception occurred while uploading file for feature " + feature + ": " + e.getMessage() + "\"}");
        } catch (IOException e) {
            logger.error("Error uploading file for feature {}: {}", feature, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"Error uploading file for feature " + feature + ": " + e.getMessage() + "\"}");
        }
    }
}