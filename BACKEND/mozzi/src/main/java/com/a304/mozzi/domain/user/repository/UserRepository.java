package com.a304.mozzi.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.a304.mozzi.domain.user.model.UserModel;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Integer> {
    UserModel findByUserCode(String user_code);

    boolean existsByUserCode(String user_code);

}
