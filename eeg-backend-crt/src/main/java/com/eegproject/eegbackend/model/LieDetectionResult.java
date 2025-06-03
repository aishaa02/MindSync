// File: src/main/java/com/mindsync/model/LieDetectionResult.java

package com.eegproject.eegbackend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "lie_detection_results")
public class LieDetectionResult {

    @Id
    private String id;

    private String userId;
    private boolean lieDetected;
    private String timestamp;
    private String fileId;
    private String prediction;
    private String fileName;  // ✅ NEW FIELD

    public LieDetectionResult() {}

    public LieDetectionResult(String userId, boolean lieDetected, String timestamp, String prediction, String fileName) {
        this.userId = userId;
        this.lieDetected = lieDetected;
        this.timestamp = timestamp;
        this.prediction = prediction;
        this.fileName = fileName;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public boolean isLieDetected() { return lieDetected; }
    public void setLieDetected(boolean lieDetected) { this.lieDetected = lieDetected; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public String getFileId() { return fileId; }
    public void setFileId(String fileId) { this.fileId = fileId; }

    public String getPrediction() { return prediction; }
    public void setPrediction(String prediction) { this.prediction = prediction; }

    public String getFileName() { return fileName; }  // ✅ NEW GETTER
    public void setFileName(String fileName) { this.fileName = fileName; }  // ✅ NEW SETTER
}
