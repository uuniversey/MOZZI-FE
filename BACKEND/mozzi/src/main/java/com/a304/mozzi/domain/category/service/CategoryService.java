package com.a304.mozzi.domain.category.service;

import com.a304.mozzi.domain.category.model.CategoryModel;
import com.a304.mozzi.domain.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService
{
    CategoryRepository categoryRepository;
    public CategoryModel getCategoryModelById(Integer id)
    {
        return categoryRepository.findCategoryModelById(id);
    }
}
