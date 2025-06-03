package com.eegproject.eegbackend.controller;

import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.eegproject.eegbackend.model.LieDetectionResult;
import com.eegproject.eegbackend.repository.LieDetectionResultRepository;
import com.eegproject.eegbackend.service.LieDetectionService;

@RestController
@RequestMapping("/api/lie")
@CrossOrigin
public class LieDetectionResultController {

    @Autowired
    private LieDetectionResultRepository lieRepo;

    @Autowired
    private LieDetectionService lieDetectionService;

    // Save a new lie detection result
    @PostMapping("/save")
    public ResponseEntity<?> savePrediction(@RequestBody Map<String, String> payload) {
    try {
        String userId = payload.get("userId");
        String prediction = payload.get("prediction");
        String fileName = payload.get("fileName");

        if (userId == null || prediction == null || fileName == null) {
            return ResponseEntity.badRequest().body("Missing required fields");
        }

        LieDetectionResult result = new LieDetectionResult();
        result.setUserId(userId);
        result.setPrediction(prediction);
        result.setLieDetected("Lie".equalsIgnoreCase(prediction));
        result.setFileName(fileName);
        result.setTimestamp(java.time.LocalDateTime.now().toString());

        LieDetectionResult saved = lieRepo.save(result);
        return ResponseEntity.ok(saved);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}

    // Get all lie detection results
    @GetMapping("/all")
    public List<LieDetectionResult> getAllResults() {
        return lieRepo.findAll();
    }

    // Get lie detection results by user ID
    @GetMapping("/user/{userId}")
    public List<LieDetectionResult> getResultsByUser(@PathVariable String userId) {
        return lieRepo.findByUserId(userId);
    }

    @PostMapping("/process")
    public ResponseEntity<?> processLieDetection(@RequestBody Map<String, String> requestBody) {
        try {
            String userId = requestBody.get("userId");
            String fileId = requestBody.get("fileId");

            if (userId == null || fileId == null) {
                return ResponseEntity.badRequest().body("Missing userId or fileId");
            }

            String prediction = lieDetectionService.processFileAndPredict(userId, fileId);
            return ResponseEntity.ok(Map.of("prediction", prediction));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
