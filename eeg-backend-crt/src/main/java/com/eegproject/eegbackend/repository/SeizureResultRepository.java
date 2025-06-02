package com.eegproject.eegbackend.repository;


import com.eegproject.eegbackend.model.SeizureResult;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SeizureResultRepository extends MongoRepository<SeizureResult, String> {
    List<SeizureResult> findByUserId(String userId);
}
