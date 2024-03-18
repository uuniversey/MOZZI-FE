package com.a304.mozzi.domain.ingredients.model;

import com.a304.mozzi.domain.category.model.CategoryModel;
import jakarta.persistence.*;
import lombok.*;

@Data
@Table(name = "ingredients")
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IngredientsModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ingredientsId;

    @OneToOne
    @JoinColumn(name = "category_id")
    private CategoryModel category;

    private String ingredientName;

}
