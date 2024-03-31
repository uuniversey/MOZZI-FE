package com.a304.mozzi.domain.ingredients.repository;

import com.a304.mozzi.domain.category.model.CategoryModel;
import com.a304.mozzi.domain.ingredients.model.IngredientsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientsRepository extends JpaRepository<IngredientsModel, Integer> {

    IngredientsModel findIngredientsModelByIngredientName(String ingredientsName);
    List<IngredientsModel> findIngredientsModelsByIngredientNameContains(String ingredientName);
    List<IngredientsModel> findIngredientsModelsByCategory(CategoryModel category);
}
