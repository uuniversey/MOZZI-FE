package com.a304.mozzi.domain.foodIngredient.model;

import com.a304.mozzi.domain.foods.model.Food;
import com.a304.mozzi.domain.ingredients.model.IngredientsModel;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "food_ingredient")
public class FoodIngredientModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer foodIngredientId;

    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;

    @ManyToOne
    @JoinColumn(name = "ingredient_id")
    private IngredientsModel ingredientsModel;

    private Float ingredientRatio;
    private Integer ingredientCount;
}
