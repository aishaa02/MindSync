// File: src/main/java/com/mindsync/model/EmotionResult.java

package com.eegproject.eegbackend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "emotion_results")  // MongoDB collection name
public class EmotionResult {

    @Id
    private String id;

    private String userId;  // optional: to track which user uploaded
    private String emotion;
    private double confidence;
    private String timestamp;

    // Constructors
    public EmotionResult() {}

    public EmotionResult(String userId, String emotion, double confidence, String timestamp) {
        this.userId = userId;
        this.emotion = emotion;
        this.confidence = confidence;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getEmotion() { return emotion; }
    public void setEmotion(String emotion) { this.emotion = emotion; }

    public double getConfidence() { return confidence; }
    public void setConfidence(double confidence) { this.confidence = confidence; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}
