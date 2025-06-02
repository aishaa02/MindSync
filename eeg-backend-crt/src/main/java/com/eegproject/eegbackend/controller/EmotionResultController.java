package com.eegproject.eegbackend.controller;

import com.eegproject.eegbackend.model.EmotionResult;
import com.eegproject.eegbackend.repository.EmotionResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emotion")
@CrossOrigin
public class EmotionResultController {

    @Autowired
    private EmotionResultRepository emotionRepo;

    @PostMapping("/save")
    public EmotionResult saveEmotionResult(@RequestBody EmotionResult result) {
        return emotionRepo.save(result);
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
