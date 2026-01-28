package com.backend.backend.Repository;

import com.backend.backend.model.SalonService;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalonServiceRepository extends MongoRepository<SalonService, String> {
}
