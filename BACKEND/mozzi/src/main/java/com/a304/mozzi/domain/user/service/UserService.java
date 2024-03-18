package com.a304.mozzi.domain.user.service;

import com.a304.mozzi.domain.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.a304.mozzi.domain.foods.model.Food;
import com.a304.mozzi.domain.user.customfood.model.UserFood;
import com.a304.mozzi.domain.user.customfood.repository.UserFoodRepository;
import com.a304.mozzi.domain.user.model.UserModel;
import com.fasterxml.jackson.databind.RuntimeJsonMappingException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserFoodRepository userFoodRepository;

    public UserModel create(final UserModel userModel) {
        if (userModel == null || userModel.getUserCode() == null) {
            throw new RuntimeJsonMappingException("Invalid argument");
        }
        final String email = userModel.getUserCode();
        if (userRepository.existsByUserCode(email)) {
            log.warn("email already existss {}", email);
            throw new RuntimeJsonMappingException("Username Already exists");
        }
        // userModel.setRole("ROLE_GUEST");
        return userRepository.save(userModel);
    }

    public boolean existsByUserCode(String user_code) {
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

    public UserModel findCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();
        Optional<UserModel> userOptional = findByUserCode(username);

        UserModel user = null;
        if (userOptional.isPresent()) {
            user = userOptional.get();
        }
        return user;
    }

    public void setUserIsVegan(UserModel user, boolean isVegan) {
        if (isVegan) {
            user.setUserIsvegan(1);
        } else {
            user.setUserIsvegan(0);
        }
        userRepository.save(user);
    }

    public void setUserNickname(UserModel user, String nickname) {
        user.setUserNickname(nickname);
        userRepository.save(user);
    }

    public UserFood findUserFoodByUserAndFood(UserModel user, Food food) {
        return userFoodRepository.findByUserAndFood(user, food);
    }

    public void userFoodDeleteByUserFoodId(UserFood userFood) {
        userFoodRepository.deleteById(userFood.getUserFoodId());
    }

}
