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
    private double confidence;
    private String timestamp;
    private String fileId;
    private String prediction;  // you might want to map prediction string to lieDetected/confidence later


    public LieDetectionResult() {}

    public LieDetectionResult(String userId, boolean lieDetected, double confidence, String timestamp) {
        this.userId = userId;
        this.lieDetected = lieDetected;
        this.confidence = confidence;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public boolean isLieDetected() { return lieDetected; }
    public void setLieDetected(boolean lieDetected) { this.lieDetected = lieDetected; }

    public double getConfidence() { return confidence; }
    public void setConfidence(double confidence) { this.confidence = confidence; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public String getFileId() {
    return fileId;
}

public void setFileId(String fileId) {
    this.fileId = fileId;
}

public String getPrediction() {
    return prediction;
}

public void setPrediction(String prediction) {
    this.prediction = prediction;
}

}

