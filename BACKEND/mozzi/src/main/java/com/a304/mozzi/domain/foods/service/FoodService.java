package com.a304.mozzi.domain.foods.service;

import com.a304.mozzi.domain.foods.model.Food;
import com.a304.mozzi.domain.foods.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class FoodService {
    private final FoodRepository foodRepository;
    public Food findFoodByFoodName(String foodName){
        return foodRepository.findFoodByFoodName(foodName);
    }
}
