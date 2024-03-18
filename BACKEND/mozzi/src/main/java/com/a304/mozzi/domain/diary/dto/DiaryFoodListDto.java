package com.a304.mozzi.domain.diary.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@Builder
public class DiaryFoodListDto {
    List<DiaryDto> foods;
}
