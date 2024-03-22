package com.a304.mozzi.domain.user.dto;

import com.a304.mozzi.domain.user.customingredient.dto.UserIngredientDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Builder
@Setter
public class UserProfileDto {
    private List<UserIngredientDto> foods;
    private Integer id;
    private String nickname;
    private Integer isVegan;
}
