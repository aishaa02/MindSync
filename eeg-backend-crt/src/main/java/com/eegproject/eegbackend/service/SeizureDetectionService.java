package com.eegproject.eegbackend.service;

import com.eegproject.eegbackend.model.SeizureResult;
import com.eegproject.eegbackend.repository.SeizureResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.io.IOException;

@Service
public class SeizureDetectionService {

    @Autowired
    private SeizureResultRepository seizureRepo;

    @Autowired
    private MongoFileService mongoFileService;

    private final String flaskUrl = "http://localhost:5000/api/seizure-detect";

    /*public boolean processFileAndPredict(String userId, String fileId, String fileName) throws IOException {
        // 1. Fetch file bytes
        byte[] fileBytes = mongoFileService.getFileBytesById(fileId);
        if (fileBytes == null) {
            throw new IOException("File not found with id: " + fileId);
        }

        // 2. Prepare request to Flask
        RestTemplate restTemplate = new RestTemplate();

        ByteArrayResource fileAsResource = new ByteArrayResource(fileBytes) {
            @Override
            public String getFilename() {
                return fileName != null ? fileName : "upload.edf";
            }
        };

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        org.springframework.util.MultiValueMap<String, Object> body = new org.springframework.util.LinkedMultiValueMap<>();
        body.add("file", fileAsResource);

        HttpEntity<org.springframework.util.MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<FlaskResponse> response = restTemplate.postForEntity(flaskUrl, requestEntity, FlaskResponse.class);

       System.out.println("Flask response status: " + response.getStatusCode());
       System.out.println("Flask response body (seizureDetected): " + response.getBody().isSeizureDetected());



        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new IOException("Failed to get prediction from Flask");
        }

        boolean seizureDetected = response.getBody().isSeizureDetected();

        // 3. Save result to MongoDB
        SeizureResult result = new SeizureResult();
        result.setUserId(userId);
        result.setSeizureDetected(seizureDetected);
        result.setFileName(fileName);
        

        result.setTimestamp(String.valueOf(System.currentTimeMillis()));

        seizureRepo.save(result);

        return seizureDetected;
    }*/

   // SeizureDetectionService.java

// SeizureDetectionService.java
public boolean processFileAndPredict(String fileId, String fileName) throws IOException {
    byte[] fileBytes = mongoFileService.getFileBytesById(fileId);
    if (fileBytes == null) {
        throw new IOException("File not found with id: " + fileId);
    }

    // Send to Flask
    RestTemplate restTemplate = new RestTemplate();
    ByteArrayResource fileAsResource = new ByteArrayResource(fileBytes) {
        @Override
        public String getFilename() {
            return fileName != null ? fileName : "eeg.edf";
        }
    };

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.MULTIPART_FORM_DATA);

    MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
    body.add("file", fileAsResource);

    HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
    ResponseEntity<FlaskResponse> response = restTemplate.postForEntity(flaskUrl, requestEntity, FlaskResponse.class);

    if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
        throw new IOException("Flask service failed");
    }

    return response.getBody().isSeizureDetected();
}



    public static class FlaskResponse {
        private boolean seizureDetected;

        public boolean isSeizureDetected() {
            return seizureDetected;
        }

        public void setSeizureDetected(boolean seizureDetected) {
            this.seizureDetected = seizureDetected;
        }
    }
}



