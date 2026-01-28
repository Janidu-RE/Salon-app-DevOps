package com.backend.backend.Controller;

import com.backend.backend.Repository.AppointmentRepository;
import com.backend.backend.model.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @PostMapping
    public ResponseEntity<?> bookAppointment(@RequestBody Appointment appointment) {
        // Validation: Check if slot is already taken
        List<Appointment> existingAppointments = appointmentRepository.findByDateAndTime(appointment.getDate(),
                appointment.getTime());
        if (!existingAppointments.isEmpty()) {
            return ResponseEntity.badRequest().body("This time slot is already booked. Please choose another time.");
        }

        appointment.setStatus("PENDING");
        Appointment savedAppointment = appointmentRepository.save(appointment);
        return ResponseEntity.ok(savedAppointment);
    }

    @GetMapping("/user/{userId}")
    public List<Appointment> getUserAppointments(@PathVariable String userId) {
        return appointmentRepository.findByUserId(userId);
    }
}
