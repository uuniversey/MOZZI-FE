package com.a304.mozzi.domain.foodIngredient.service;

import com.a304.mozzi.domain.foodIngredient.model.FoodIngredientModel;
import com.a304.mozzi.domain.foodIngredient.repository.FoodIngredientRepository;
import com.a304.mozzi.domain.ingredients.model.IngredientsModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FoodIngredientService {
    private final FoodIngredientRepository foodIngredientRepository;
    List<FoodIngredientModel> findFoodIngredientModelsByIngredientsModel(IngredientsModel ingredientsModel){
        return foodIngredientRepository.findFoodIngredientModelsByIngredientsModel(ingredientsModel);
    }
}
