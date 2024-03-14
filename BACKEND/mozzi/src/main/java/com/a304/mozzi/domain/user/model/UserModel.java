package com.a304.mozzi.domain.user.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Builder
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;
    private String userCode;
    private String userNickname;
    
    @Column(name = "user_register_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime userRegisterDate;
    private Integer userIsvegan;


    @PrePersist
    public void prePersist() {
        this.userRegisterDate = LocalDateTime.now();
    }
}
