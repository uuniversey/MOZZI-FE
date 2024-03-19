package com.a304.mozzi.domain.user.service;

import com.a304.mozzi.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.a304.mozzi.domain.user.model.UserModel;
import com.fasterxml.jackson.databind.RuntimeJsonMappingException;

import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

@Slf4j
@Service
public class UserService {

    @Autowired
    UserRepository userRepository;
    public UserModel create(final UserModel userModel) {
        if (userModel == null || userModel.getUserCode() == null) {
            throw new RuntimeJsonMappingException("Invalid argument");
        }
        final String email = userModel.getUserCode();
        if (userRepository.existsByUserCode(email)) {
            log.warn("email already existss {}", email);
            throw new RuntimeJsonMappingException("Username Already exists");
        }
//        userModel.setRole("ROLE_GUEST");
        return userRepository.save(userModel);
    }
    public boolean existsByUserCode(String user_code)
    {
        return userRepository.existsByUserCode(user_code);
    }

    public Optional<UserModel> findByUserCode(String userCode) {
        var user = userRepository.findByUserCode(userCode);
        // userRepository.findByEmail(email);
        // var user = new UserModel();
        // user.setId(1L);
        // user.setEmail(EXISTING_EMAIL);
        // user.setPassword("$2a$12$BfaDWPgHgVMTlEqvWtgNWuMPhHJ3OUkeaKT.8OyM6Rzf4yTISd.wa");
        // // test
        // user.setRole("ROLE_ADMIN");
        // user.setExtraInfo("My DD");
        return Optional.ofNullable(user);
    }
}
