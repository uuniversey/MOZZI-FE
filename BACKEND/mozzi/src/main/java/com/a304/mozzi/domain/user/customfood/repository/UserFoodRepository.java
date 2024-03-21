package com.a304.mozzi.domain.user.customfood.repository;

import com.a304.mozzi.domain.foods.model.Food;
import com.a304.mozzi.domain.user.customfood.model.UserFood;
import com.a304.mozzi.domain.user.model.UserModel;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserFoodRepository extends JpaRepository<UserFood, Integer> {

    public UserFood findByUserAndFood(UserModel user, Food food);
}
