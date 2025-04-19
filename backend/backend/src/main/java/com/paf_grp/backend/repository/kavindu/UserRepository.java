package com.paf_grp.backend.repository.kavindu;

import com.paf_grp.backend.model.kavindu.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

    // ✅ This enables login by username
    User findByUsername(String username);
}
