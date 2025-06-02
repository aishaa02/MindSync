package com.eegproject.eegbackend.repository;

import com.eegproject.eegbackend.model.FileMetadata;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FileMetadataRepository extends MongoRepository<FileMetadata, String> {
}
