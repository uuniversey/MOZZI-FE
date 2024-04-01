package com.a304.mozzi.domain.ingredients.service;

import com.a304.mozzi.domain.category.model.CategoryModel;
import com.a304.mozzi.domain.ingredients.model.IngredientsModel;
import com.a304.mozzi.domain.ingredients.repository.IngredientsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class IngredientsService {
    private  final IngredientsRepository ingredientsRepository;
    public IngredientsModel findIngredientsByIngredientsName(String ingredientsName)
    {
        return ingredientsRepository.findIngredientsModelByIngredientName(ingredientsName);
    }

    public List<IngredientsModel> findIngredientsModelsByIngredientNameContains(String ingredientName){
        return ingredientsRepository.findIngredientsModelsByIngredientNameContains(ingredientName);
    }
    public List<IngredientsModel> findIngredientsModelByCategory(CategoryModel category)
    {
        return ingredientsRepository.findIngredientsModelsByCategory(category);
    }
}
