package com.a304.mozzi.recipe.model;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// import org.springframework.boot.autoconfigure.domain.EntityScan;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name="DATAS_FOOD")
public class DatasFood {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String food_name;
  private String food_recipe;
  private String food_views;
  private String food_pic;
  private Float food_salty_rate;
  private Float food_sweet_rate;
  private Float food_bitter_rate;
  private Float food_sour_rate;
  private Float food_umami_rate;
  private Float food_spicy_rate;
  private String food_category;
  private Integer food_today_views;

  
 
}
