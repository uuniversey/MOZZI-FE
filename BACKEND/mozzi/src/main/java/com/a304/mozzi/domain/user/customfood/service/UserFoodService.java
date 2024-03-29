package com.a304.mozzi.domain.user.customfood.service;

import com.a304.mozzi.domain.foods.model.Food;
import com.a304.mozzi.domain.user.customfood.model.UserFood;
import com.a304.mozzi.domain.user.customfood.repository.UserFoodRepository;
import com.a304.mozzi.domain.user.model.UserModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserFoodService {
    private  final  UserFoodRepository userFoodRepository;
    public void createWholeRelation(Integer userId)
    {
        userFoodRepository.createWholeRelation(userId);
    }

    public void setUserFoodModel(UserFood userFood, Float score)
    {
        userFood.setUserFoodPreference(userFood.getUserFoodPreference() + score);
        userFoodRepository.save(userFood);
    }

    public UserFood findUserFoodByUserAndFood(UserModel user, Food food)
    {
        return userFoodRepository.findUserFoodByUserAndFood(user, food);
    }
}
