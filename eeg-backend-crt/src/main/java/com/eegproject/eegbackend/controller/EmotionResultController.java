package com.eegproject.eegbackend.controller;

import com.eegproject.eegbackend.model.EmotionResult;
import com.eegproject.eegbackend.repository.EmotionResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
@RequestMapping("/api/emotion")
@CrossOrigin
public class EmotionResultController {

    @Autowired
    private EmotionResultRepository emotionRepo;

    /*@PostMapping("/save")
    public EmotionResult saveEmotionResult(@RequestBody EmotionResult result) {
        return emotionRepo.save(result);
    }*/

   @PostMapping("/save")
    public ResponseEntity<?> saveEmotionPrediction(@RequestBody Map<String, String> payload) {
        try {
            String userId = payload.get("userId");
            String emotion = payload.get("emotion");
            String fileName = payload.get("fileName");

            if (userId == null || emotion == null || fileName == null) {
                return ResponseEntity.badRequest().body("Missing required fields");
            }

            EmotionResult result = new EmotionResult();
            result.setUserId(userId);
            result.setEmotion(emotion);
            result.setFileName(fileName);
            result.setTimestamp(java.time.LocalDateTime.now().toString());

            EmotionResult saved = emotionRepo.save(result);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public List<EmotionResult> getAllResults() {
        return emotionRepo.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<EmotionResult> getResultsByUser(@PathVariable String userId) {
        return emotionRepo.findByUserId(userId);
    }

}

    
     

