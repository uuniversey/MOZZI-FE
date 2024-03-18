package com.a304.mozzi.domain.category.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Table(name = "category")
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer categoryId;
    private String categoryPic;
    private String categoryName;
}
