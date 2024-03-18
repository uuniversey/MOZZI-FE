package com.a304.mozzi.domain.ingredients.repository;

import com.a304.mozzi.domain.ingredients.model.IngredientsModel;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientsRepository extends JpaRepository<IngredientsModel, Integer> {

    IngredientsModel findIngredientsModelByIngredientName(String ingredientsName);
}
