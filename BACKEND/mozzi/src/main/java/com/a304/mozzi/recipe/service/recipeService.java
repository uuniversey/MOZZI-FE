package com.a304.mozzi.recipe.service;

import org.springframework.stereotype.Service;
import com.a304.mozzi.recipe.model.DatasFood;


@Service
public class FoodService {
    @Autowired
    private FoodRepository foodRepository;

    public List<Food> getFoodByName(String foodName) {
        return foodRepository.findByFoodName(foodName);
    }
}
