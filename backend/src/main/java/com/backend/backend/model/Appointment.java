package com.backend.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Appointments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
    @Id
    private String id;
    private String userId;
    private String username; // Store for display convenience (optional, but helpful)
    private String serviceName;
    private String date; // YYYY-MM-DD
    private String time; // HH:mm
    private String status; // BOOKED, COMPLETED, CANCELLED
}
