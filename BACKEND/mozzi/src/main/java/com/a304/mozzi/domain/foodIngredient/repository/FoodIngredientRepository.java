package com.a304.mozzi.domain.foodIngredient.repository;

import com.a304.mozzi.domain.foodIngredient.model.FoodIngredientModel;
import com.a304.mozzi.domain.ingredients.model.IngredientsModel;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodIngredientRepository extends JpaRepository<FoodIngredientModel, Integer> {

    List<FoodIngredientModel> findFoodIngredientModelsByIngredientsModel(IngredientsModel ingredientsModel);
}
