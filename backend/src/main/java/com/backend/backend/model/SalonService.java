package com.backend.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "SalonServices")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalonService {
    @Id
    private String id;
    private String name;
    private String description;
    private String price;
    private String category; // e.g., "Hair", "Skin", "Makeup"
}
