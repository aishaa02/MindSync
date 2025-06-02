/*package com.eegproject.eegbackend.controller;

import com.eegproject.eegbackend.model.SeizureResult;
import com.eegproject.eegbackend.repository.SeizureResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seizure")
@CrossOrigin
public class SeizureResultController {

    @Autowired
    private SeizureResultRepository seizureRepo;

    @PostMapping("/save")
    public SeizureResult saveSeizureResult(@RequestBody SeizureResult result) {
        return seizureRepo.save(result);
    }

    @GetMapping("/all")
    public List<SeizureResult> getAllResults() {
        return seizureRepo.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<SeizureResult> getResultsByUser(@PathVariable String userId) {
        return seizureRepo.findByUserId(userId);
    }
}*/

package com.eegproject.eegbackend.controller;

import com.eegproject.eegbackend.model.SeizureResult;
import com.eegproject.eegbackend.repository.SeizureResultRepository;
import com.eegproject.eegbackend.service.SeizureDetectionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/seizure")
@CrossOrigin
public class SeizureResultController {

    @Autowired
    private SeizureResultRepository seizureRepo;

    @Autowired
    private SeizureDetectionService seizureDetectionService;

    @PostMapping("/save")
    public SeizureResult saveSeizureResult(@RequestBody SeizureResult result) {
        return seizureRepo.save(result);
    }

    @GetMapping("/all")
    public List<SeizureResult> getAllResults() {
        return seizureRepo.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<SeizureResult> getResultsByUser(@PathVariable String userId) {
        return seizureRepo.findByUserId(userId);
    }

    @PostMapping("/process")
    public ResponseEntity<?> processSeizureDetection(@RequestBody Map<String, String> requestBody) {
        try {
            String userId = requestBody.get("userId");
            String fileId = requestBody.get("fileId");
            String fileName = requestBody.get("fileName");

            if (userId == null || fileId == null) {
                return ResponseEntity.badRequest().body("Missing userId or fileId");
            }

            boolean seizureDetected = seizureDetectionService.processFileAndPredict(userId, fileId, fileName);
            return ResponseEntity.ok(Map.of("seizureDetected", seizureDetected));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}

