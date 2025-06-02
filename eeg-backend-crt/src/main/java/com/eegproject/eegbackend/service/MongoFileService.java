package com.eegproject.eegbackend.service;

import com.mongodb.client.gridfs.model.GridFSFile;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.io.IOException;
import java.io.InputStream;

@Service
public class MongoFileService {

    @Autowired
    private GridFsTemplate gridFsTemplate;

    public byte[] getFileBytesById(String fileId) throws IOException {
        GridFSFile file = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(fileId)));
        if (file == null) return null;

        GridFsResource resource = gridFsTemplate.getResource(file);
        InputStream is = resource.getInputStream();
        try {
            return IOUtils.toByteArray(is);
        } finally {
            if (is != null) {
                is.close();
            }
        }
    }
}
