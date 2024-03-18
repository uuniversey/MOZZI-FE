package com.a304.mozzi.domain.user.customfood.model;


import com.a304.mozzi.domain.foods.model.Food;
import com.a304.mozzi.domain.user.model.UserModel;
import jakarta.persistence.*;
import lombok.*;

@Builder
@Entity
@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_food")
public class UserFood {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userFoodId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel user;

    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;

    private float userFoodPreference;
}
