package com.eegproject.eegbackend.service;

import com.eegproject.eegbackend.model.EmotionResult;
import com.eegproject.eegbackend.repository.EmotionResultRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmotionResultService {

    @Autowired
    private EmotionResultRepository repository;

    public void saveEmotionResult(EmotionResult result) {
    repository.save(result);
}

    public List<EmotionResult> getResultsByUserId(String userId) {
        return repository.findByUserId(userId);
    }
}
