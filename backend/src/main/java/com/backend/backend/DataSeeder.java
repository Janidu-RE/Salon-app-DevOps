package com.backend.backend;

import com.backend.backend.Repository.SalonServiceRepository;
import com.backend.backend.model.SalonService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final SalonServiceRepository salonServiceRepository;

    public DataSeeder(SalonServiceRepository salonServiceRepository) {
        this.salonServiceRepository = salonServiceRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (salonServiceRepository.count() == 0) {
            List<SalonService> services = Arrays.asList(
                    new SalonService(null, "Haircut (Men)", "Professional haircut for men", "20.00", "Hair"),
                    new SalonService(null, "Haircut (Women)", "Professional haircut for women", "30.00", "Hair"),
                    new SalonService(null, "Hair Coloring", "Full hair coloring service", "60.00", "Hair"),
                    new SalonService(null, "Manicure", "Classic manicure service", "25.00", "Nails"),
                    new SalonService(null, "Pedicure", "Classic pedicure service", "35.00", "Nails"),
                    new SalonService(null, "Facial", "Rejuvenating facial treatment", "50.00", "Skin"),
                    new SalonService(null, "Full Body Massage", "Relaxing full body massage (60 mins)", "80.00",
                            "Massage"));

            salonServiceRepository.saveAll(services);
            System.out.println("Seeded initial data for Salon Services.");
        }
    }
}
