package com.a304.mozzi.domain.redis.model;


import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

public class LinkedList {
    RedisTemplate<String, Object> redisTemplate;
    public void createUserCache(String userId)
    {
        ValueOperations<String, Object> values = redisTemplate.opsForValue();
        values.set(userId + ":LinkedList:Head", values);
    }
    public String
}
