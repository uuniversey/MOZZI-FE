package com.a304.mozzi.config;

import com.a304.mozzi.domain.category.model.CategoryModel;
import com.a304.mozzi.domain.category.service.CategoryService;
import com.a304.mozzi.domain.ingredients.model.IngredientsModel;
import com.a304.mozzi.domain.ingredients.service.IngredientsService;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Component
@Builder(toBuilder = true)
@RequiredArgsConstructor
public class AllergicComponent {
    private final  IngredientsService ingredientsService;
    private final CategoryService categoryService;
    private final Map<String, Integer> categoryMap = new HashMap<>();
    public List<IngredientsModel> categorizeIngredient(String ingredient) {
        Integer category = categoryMap.getOrDefault(ingredient, 5); // 나머지는 4로 설정
        switch (category) {
            case 1:
                if (ingredient.equals("난류"))
                {
                    CategoryModel categoryModel = categoryService.getCategoryModelById(1);
                    return ingredientsService.findIngredientsModelByCategory(categoryModel);
                }
                else if (ingredient.equals("우유"))
                {
                    CategoryModel categoryModel = categoryService.getCategoryModelById(2);
                    return ingredientsService.findIngredientsModelByCategory(categoryModel);
                }
                else
                {
                    CategoryModel categoryModel = categoryService.getCategoryModelById(4);
                    return ingredientsService.findIngredientsModelByCategory(categoryModel);
                }
            case 2:
                return ingredientsService.findIngredientsModelsByIngredientNameContains(ingredient);
            case 3:
                if (ingredient.equals("닭고기"))
                {
                    return ingredientsService.findIngredientsModelsByIngredientNameContains("닭");
                }
                else
                {
                    return ingredientsService.findIngredientsModelsByIngredientNameContains("소고기");
                }
            case 4:
            {
                List<IngredientsModel> list = new ArrayList<>();
                if (ingredient.equals("게"))
                {
                    list.add(ingredientsService.findIngredientsByIngredientsName("꽃게"));
                    list.add(ingredientsService.findIngredientsByIngredientsName("게맛살"));
                }
                else if (ingredient.equals("밀가루"))
                {
                    list.add(ingredientsService.findIngredientsByIngredientsName("밀가루"));
                    list.add(ingredientsService.findIngredientsByIngredientsName("밀가루박력분"));
                    list.add(ingredientsService.findIngredientsByIngredientsName("밀가루중력분"));
                    list.add(ingredientsService.findIngredientsByIngredientsName("밀전병"));
                    list.add(ingredientsService.findIngredientsByIngredientsName("통밀가루"));
                    list.add(ingredientsService.findIngredientsByIngredientsName("호밀가루"));
                }
                else
                {
                    list.add(ingredientsService.findIngredientsByIngredientsName("굴"));
                    list.add(ingredientsService.findIngredientsByIngredientsName("굴소스"));
                }
                return list;
            }
            default:
                // 기본 작업 수행
                return new ArrayList<>();

        }
    }
    public void customAction() {
        // Map에 값을 추가하는 코드
        categoryMap.put("난류", 1);
        categoryMap.put("우유", 1);
        categoryMap.put("땅콩", 1);
        categoryMap.put("호두", 1);
        categoryMap.put("대두", 1);
        categoryMap.put("오징어", 2);
        categoryMap.put("전복", 2);
        categoryMap.put("돼지고기", 2);
        categoryMap.put("새우", 2);
        categoryMap.put("토마토", 2);
        categoryMap.put("잣", 2);
        categoryMap.put("홍합", 2);
        categoryMap.put("메밀", 2);
        categoryMap.put("복숭아", 2);
        categoryMap.put("고등어", 2);
        categoryMap.put("쇠고기", 3);
        categoryMap.put("닭고기", 3);
        categoryMap.put("굴", 4);
        categoryMap.put("밀", 4);
        categoryMap.put("게", 4);

        System.out.println("Map에 값이 추가되었습니다.");
    }
}

