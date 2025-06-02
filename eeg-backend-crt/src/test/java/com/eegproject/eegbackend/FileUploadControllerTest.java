package com.eegproject.eegbackend;

import com.eegproject.eegbackend.controller.FileUploadController;
import com.eegproject.eegbackend.model.FileMetadata;
import com.eegproject.eegbackend.repository.FileMetadataRepository;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FileUploadControllerTest {

    @InjectMocks
    private FileUploadController fileUploadController;

    @Mock
    private GridFsTemplate gridFsTemplate;

    @Mock
    private FileMetadataRepository fileMetadataRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testUploadFile_Success() {
        MockMultipartFile mockFile = new MockMultipartFile(
                "file", "test.mat", "application/octet-stream", "dummy content".getBytes()
        );
        String feature = "emotion";
        String userId = "12345";

        ObjectId mockFileId = new ObjectId();
        when(gridFsTemplate.store(any(), eq("test.mat"), eq("application/octet-stream"))).thenReturn(mockFileId);

        ResponseEntity<?> response = fileUploadController.uploadFile(mockFile, feature, userId);

        assertNotNull(response);
        assertEquals(200, response.getStatusCode().value());
        assertTrue(response.getBody().toString().contains("File uploaded successfully"));

        verify(fileMetadataRepository, times(1)).save(any(FileMetadata.class));
    }

    @Test
    void testUploadFile_InvalidFeature() {
        MockMultipartFile mockFile = new MockMultipartFile(
                "file", "test.mat", "application/octet-stream", "dummy content".getBytes()
        );
        String feature = "invalidFeature";
        String userId = "12345";

        ResponseEntity<?> response = fileUploadController.uploadFile(mockFile, feature, userId);

        assertNotNull(response);
        assertEquals(400, response.getStatusCode().value());
        assertTrue(response.getBody().toString().contains("Invalid feature"));
    }

    @Test
    void testUploadFile_EmptyFile() {
        MockMultipartFile mockFile = new MockMultipartFile(
                "file", "", "application/octet-stream", new byte[0]
        );
        String feature = "lie";
        String userId = "12345";

        ResponseEntity<?> response = fileUploadController.uploadFile(mockFile, feature, userId);

        assertNotNull(response);
        assertEquals(400, response.getStatusCode().value());
        assertTrue(response.getBody().toString().contains("Please select a file to upload"));
    }

    @Test
    void testUploadFile_GridFsError() {
        MockMultipartFile mockFile = new MockMultipartFile(
                "file", "test.csv", "text/csv", "dummy content".getBytes()
        );
        String feature = "lie";
        String userId = "12345";

        when(gridFsTemplate.store(any(), eq("test.csv"), eq("text/csv")))
                .thenThrow(new RuntimeException("GridFS error"));

        ResponseEntity<?> response = fileUploadController.uploadFile(mockFile, feature, userId);

        assertNotNull(response);
        assertEquals(500, response.getStatusCode().value());
        assertTrue(response.getBody().toString().contains("Runtime exception occurred while uploading file"));
    }
}
