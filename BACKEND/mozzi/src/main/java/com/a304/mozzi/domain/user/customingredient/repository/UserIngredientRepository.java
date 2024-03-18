package com.a304.mozzi.domain.user.customingredient.repository;

import com.a304.mozzi.domain.ingredients.model.IngredientsModel;
import com.a304.mozzi.domain.user.customingredient.model.UserIngredientModel;
import com.a304.mozzi.domain.user.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserIngredientRepository extends JpaRepository<UserIngredientModel, Integer> {

    public UserIngredientModel findUserIngredientModelByUserAndIngredients(UserModel user, IngredientsModel ingredientsModel);
}
