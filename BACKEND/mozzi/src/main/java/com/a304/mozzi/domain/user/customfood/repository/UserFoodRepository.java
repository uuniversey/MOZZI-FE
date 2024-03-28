package com.a304.mozzi.domain.user.customfood.repository;

import com.a304.mozzi.domain.foods.model.Food;
import com.a304.mozzi.domain.user.customfood.model.UserFood;
import com.a304.mozzi.domain.user.model.UserModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface UserFoodRepository extends JpaRepository<UserFood, Integer> {

    public UserFood findByUserAndFood(UserModel user, Food food);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO mozzi.user_food (user_id, food_id) " +
            "select mozzi.user.user_id, datas_foods.food_id " +
            "from user cross join datas_foods " +
            "where user.user_id = :userId", nativeQuery = true)
    public void createWholeRelation(@Param("userId") Integer userId);

}
