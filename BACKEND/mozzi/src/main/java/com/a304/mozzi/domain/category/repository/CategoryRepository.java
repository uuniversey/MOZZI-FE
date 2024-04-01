package com.a304.mozzi.domain.category.repository;

import com.a304.mozzi.domain.category.model.CategoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryModel, Integer> {
    CategoryModel findCategoryModelById(Integer id);
}
