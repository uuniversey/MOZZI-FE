package com.a304.mozzi.domain.user.customfood.service;

import com.a304.mozzi.domain.user.customfood.repository.UserFoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserFoodService {
    private  final  UserFoodRepository userFoodRepository;
    public void createWholeRelation(Integer userId)
    {
        userFoodRepository.createWholeRelation(userId);
    }
}
