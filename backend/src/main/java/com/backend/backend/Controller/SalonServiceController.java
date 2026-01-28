package com.backend.backend.Controller;

import com.backend.backend.Repository.SalonServiceRepository;
import com.backend.backend.model.SalonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class SalonServiceController {

    @Autowired
    private SalonServiceRepository salonServiceRepository;

    @GetMapping
    public List<SalonService> getAllServices() {
        return salonServiceRepository.findAll();
    }

    @PostMapping("/seed")
    public ResponseEntity<?> seedServices() {
        if (salonServiceRepository.count() > 0) {
            return ResponseEntity.ok("Services already seeded");
        }

        List<SalonService> services = List.of(
                new SalonService(null, "Hair Styling", "Professional haircuts and styling", "From Rs.700.00", "Hair"),
                new SalonService(null, "Hair Coloring", "Expert coloring services", "From Rs.1200.00", "Hair"),
                new SalonService(null, "Skin Care", "Rejuvenating facial treatments", "From Rs.800.00", "Skin"),
                new SalonService(null, "Makeup", "Professional makeup services", "From Rs.750.00", "Beauty"),
                new SalonService(null, "Manicure", "Nail care and styling", "From Rs.1500.00", "Nails"),
                new SalonService(null, "Pedicure", "Foot care and relaxation", "From Rs.1800.00", "Nails"),
                new SalonService(null, "Bridal Dressing", "Complete bridal makeover", "From Rs.15000.00", "Bridal"),
                new SalonService(null, "Head Massage", "Relaxing head massage", "From Rs.1000.00", "Massage"));

        salonServiceRepository.saveAll(services);
        return ResponseEntity.ok("Services seeded successfully");
    }
}
