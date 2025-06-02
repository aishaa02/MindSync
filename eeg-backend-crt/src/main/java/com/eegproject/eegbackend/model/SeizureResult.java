// File: src/main/java/com/mindsync/model/SeizureResult.java

package com.eegproject.eegbackend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "seizure_results")
public class SeizureResult {

    @Id
    private String id;

    private String userId;
    private boolean seizureDetected;
    private String fileName;
    private String timestamp;

    public SeizureResult() {}

    public SeizureResult(String userId, boolean seizureDetected, String fileName, String timestamp) {
        this.userId = userId;
        this.seizureDetected = seizureDetected;
        this.fileName = fileName;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public boolean isSeizureDetected() { return seizureDetected; }
    public void setSeizureDetected(boolean seizureDetected) { this.seizureDetected = seizureDetected; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}
