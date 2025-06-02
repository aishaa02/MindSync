package com.eegproject.eegbackend.service;

import com.eegproject.eegbackend.model.LieDetectionResult;
import com.eegproject.eegbackend.repository.LieDetectionResultRepository;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Service
public class LieDetectionService {

    @Autowired
    private LieDetectionResultRepository lieRepo;

    @Autowired
    private MongoFileService mongoFileService; // fetch file bytes by fileId

    private final String flaskUrl = "http://localhost:5000/api/lie-detect";

    public String processFileAndPredict(String userId, String fileId) throws IOException {
        // 1. Fetch file bytes
        byte[] fileBytes = mongoFileService.getFileBytesById(fileId);
        if (fileBytes == null) {
            throw new IOException("File not found with id: " + fileId);
        }

        // 2. Prepare Multipart request to Flask API
        RestTemplate restTemplate = new RestTemplate();

        ByteArrayResource fileAsResource = new ByteArrayResource(fileBytes) {
            @Override
            public String getFilename() {
                return "upload.csv"; // or actual filename if you store it
            }
        };

        org.springframework.util.MultiValueMap<String, Object> body = new org.springframework.util.LinkedMultiValueMap<>();
        body.add("file", fileAsResource);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<org.springframework.util.MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // 3. Call Flask API
        ResponseEntity<FlaskResponse> response = restTemplate.postForEntity(flaskUrl, requestEntity, FlaskResponse.class);

        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new IOException("Failed to get prediction from Flask");
        }

        String prediction = response.getBody().getPrediction();

        // 4. Save result to MongoDB
        LieDetectionResult result = new LieDetectionResult();
        result.setUserId(userId);
        result.setFileId(fileId);
        result.setPrediction(prediction);

        lieRepo.save(result);

        // 5. Return prediction
        return prediction;
    }

    // Inner class for deserializing Flask response JSON
    public static class FlaskResponse {
        private String prediction;

        public String getPrediction() {
            return prediction;
        }

        public void setPrediction(String prediction) {
            this.prediction = prediction;
        }
    }
}
