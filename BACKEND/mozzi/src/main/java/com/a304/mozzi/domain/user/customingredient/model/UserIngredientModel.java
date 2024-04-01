package com.a304.mozzi.domain.user.customingredient.model;


import com.a304.mozzi.domain.ingredients.model.IngredientsModel;
import com.a304.mozzi.domain.user.model.UserModel;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "user_ingredients")
public class UserIngredientModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userIngredientsId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel user;

    @ManyToOne
    @JoinColumn(name = "ingredient_id")
    private IngredientsModel ingredients;

    private Integer isLike;

    private String mainAllergy;
}
