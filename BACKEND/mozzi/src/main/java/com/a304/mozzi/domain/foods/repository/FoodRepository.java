package com.a304.mozzi.domain.foods.repository;

import com.a304.mozzi.domain.foods.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepository extends JpaRepository<Food, Integer>{
    Food findFoodByFoodName(String foodName);
}
