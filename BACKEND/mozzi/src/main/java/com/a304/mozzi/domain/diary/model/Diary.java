package com.a304.mozzi.domain.diary.model;

import com.a304.mozzi.domain.foods.model.Food;
import com.a304.mozzi.domain.user.model.UserModel;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Table(name = "diary")
@Entity
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Diary {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer diaryId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel user;
    private String diaryPhoto;
    @Column(name = "diary_date", nullable = false)
    private LocalDateTime diaryDate;
    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food foodId;
    @PrePersist
    public void prePersist() {
        this.diaryDate = LocalDateTime.now();
    }
}


