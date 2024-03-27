package com.a304.mozzi.domain.ingredients.service;

import com.a304.mozzi.domain.ingredients.model.IngredientsModel;
import com.a304.mozzi.domain.ingredients.repository.IngredientsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
public class IngrdientsService {
    private  final IngredientsRepository ingredientsRepository;
    public IngredientsModel findIngredientsByIngredientsName(String ingredientsName)
    {
        return ingredientsRepository.findIngredientsModelByIngredientName(ingredientsName);
    }
}
