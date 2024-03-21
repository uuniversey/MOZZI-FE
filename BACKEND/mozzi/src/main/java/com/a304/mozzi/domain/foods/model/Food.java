package com.a304.mozzi.domain.foods.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Table(name = "datas_foods")
@Entity
@Builder
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer foodId;

    private String foodName;
    private String foodRecipe;
    private Integer foodViews;
    private String foodPic;

    private Double foodSaltyRate;
    private Double foodSweetRate;
    private Double foodBitterRate;
    private Double foodSourRate;
    private Double foodUmamiRate;
    private Double foodSpicyRate;

    private String foodCategory;
    private Integer foodTodayViews;

    //뭐야 이거
    private Integer foodCategoryCount;


}
