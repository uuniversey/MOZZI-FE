package com.a304.mozzi.domain.user.customingredient.dto;

import com.a304.mozzi.domain.user.customfood.dto.UserFoodInpDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IngredientsListDto {
    List<UserFoodInpDto> foods;
}
