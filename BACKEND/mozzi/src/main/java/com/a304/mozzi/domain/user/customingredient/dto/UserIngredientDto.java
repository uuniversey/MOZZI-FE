package com.a304.mozzi.domain.user.customingredient.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class UserIngredientDto {

    private String ingredientName;
    private Integer isLike;

}
