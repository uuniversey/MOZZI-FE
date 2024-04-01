package com.a304.mozzi.domain.user.customingredient.service;

import com.a304.mozzi.config.AllergicComponent;
import com.a304.mozzi.domain.foodIngredient.model.FoodIngredientModel;
import com.a304.mozzi.domain.foodIngredient.repository.FoodIngredientRepository;
import com.a304.mozzi.domain.foods.model.Food;
import com.a304.mozzi.domain.ingredients.model.IngredientsModel;
import com.a304.mozzi.domain.user.customfood.model.UserFood;
import com.a304.mozzi.domain.user.customfood.service.UserFoodService;
import com.a304.mozzi.domain.user.customingredient.model.UserIngredientModel;
import com.a304.mozzi.domain.user.customingredient.repository.UserIngredientRepository;
import com.a304.mozzi.domain.user.model.UserModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@Service
@RequiredArgsConstructor
public class UserIngredientService {

    private final UserIngredientRepository userIngredientRepository;
    private final FoodIngredientRepository foodIngredientRepository;
    private final UserFoodService userFoodService;
    public void deleteAllByUser(UserModel user)
    {


        List<UserIngredientModel> userIngredientModels =  userIngredientRepository.findUserIngredientModelsByUser(user);
        for (UserIngredientModel userIngredientModel : userIngredientModels)
        {
            IngredientsModel ingredientsModel = userIngredientModel.getIngredients();
            Integer userIngredientType = userIngredientModel.getIsLike();
            List<FoodIngredientModel> foodIngredientModels =  foodIngredientRepository.findFoodIngredientModelsByIngredientsModel(ingredientsModel);
            for (FoodIngredientModel foodIngredientModel : foodIngredientModels)
            {
                Food food = foodIngredientModel.getFood();
                Float ingredientRatio = foodIngredientModel.getIngredientRatio();
                ingredientRatio /= 1000;

                UserFood userFood = userFoodService.findUserFoodByUserAndFood(user, food);
                if (userIngredientType == 1)
                {
                    ingredientRatio *= -1;
                }
                else if (userIngredientType == 2)
                {
                    ingredientRatio = userFood.getUserFoodPreference() * -1;
                }
                userFoodService.setUserFoodModel(userFood, ingredientRatio);
            }
        }
        userIngredientRepository.deleteAllByUser(user);
    }

    public UserIngredientModel create(UserIngredientModel userIngredientModel, UserModel user){

        IngredientsModel ingredientsModel = userIngredientModel.getIngredients();
        Integer userIngredientType = userIngredientModel.getIsLike();
        List<FoodIngredientModel> foodIngredientModels =  foodIngredientRepository.findFoodIngredientModelsByIngredientsModel(ingredientsModel);
        for (FoodIngredientModel foodIngredientModel : foodIngredientModels)
        {
            Food food = foodIngredientModel.getFood();
            Float ingredientRatio = foodIngredientModel.getIngredientRatio();
            ingredientRatio /= 1000;

            UserFood userFood = userFoodService.findUserFoodByUserAndFood(user, food);
            if (userIngredientType == 0)
            {
                ingredientRatio *= -1;
            }
            else if (userIngredientType == 2)
            {
                ingredientRatio = -99999999.0f;
            }
            userFoodService.setUserFoodModel(userFood, ingredientRatio);
        }
        return userIngredientRepository.save(userIngredientModel);
    }

    public List<UserIngredientModel> findUserIngredientModelsByUser(UserModel user) {
        return userIngredientRepository.findUserIngredientModelsByUser(user);
    }
}
