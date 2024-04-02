package com.a304.mozzi.domain.redis.model;


import jakarta.persistence.Id;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.sql.Struct;
import java.util.Set;

@Component
@Slf4j
@RequiredArgsConstructor
public class LinkedList {
    private  final  RedisTemplate<String, Object> redisTemplate;
    public void createUserCache(String userId)
    {
        log.info(userId);
        Set<String> keyToDelete = redisTemplate.keys(userId + ":LinkedList*");
        log.info(keyToDelete.toString());
        if (keyToDelete != null && !keyToDelete.isEmpty())
        {
            log.info(keyToDelete.size() + "개를 삭제한다");
            redisTemplate.delete(keyToDelete);
        }

        ValueOperations<String, Object> values = redisTemplate.opsForValue();
        values.set(userId + ":LinkedList:Diary:Head", "-1");
        values.set(userId + ":LinkedList:Diary:Tail", "-3");
        values.set(userId + ":LinkedList:Diary:Head" + ":next", "Null");
        values.set(userId + ":LinkedList:Diary:Tail" + ":next", "Null");
        values.set(userId + ":LinkedList:Diary:Tail" + ":before", "Null");
        values.set(userId + ":LinkedList:Diary:Head" + ":before", "Null");
        values.set(userId + ":LinkedList:Diary" + ":meta:MaxLength", "5");
        values.set(userId + ":LinkedList:Diary" + ":meta:Length", "0");
    }
    @Transactional
    public void InsertNewCache(String userId, String Id, String Value)
    {
        log.info(userId);
        ValueOperations<String, Object> values = redisTemplate.opsForValue();
        log.info(values.get(userId + ":LinkedList:Diary:meta:Length").toString());

//        Integer MaxLength = (Integer) values.get(userId + ":LinkedList:Diary:meta:MaxLength");
        Integer MaxLength = Integer.valueOf(values.get(userId + ":LinkedList:Diary:meta:MaxLength").toString());
//        Integer Length = (Integer) values.get(userId + ":LinkedList:Diary:meta:Length");

        Integer Length = Integer.valueOf(values.get(userId + ":LinkedList:Diary:meta:Length").toString());
        log.info("새로운 캐시에 접근이 들어왔다");
        log.info("현재나의 LinkedList의 상태 : " + MaxLength.toString() + "  " + Length.toString());
        if (values.get(userId + ":LinkedList:Diary:Node:" + Id) == null)
        {
            if (MaxLength <= Length)
            {
                // Head에서 빼는 로직
                String head = values.get(userId + ":LinkedList:Diary:Head:next").toString();

                log.info("head를 탐구");
//                String headContent = values.get(userId + ":LinkedList:Diary:Head").toString();
                this.PopHead(userId);
                redisTemplate.delete(head);
            }
            values.set(userId + ":LinkedList:Diary:Node:" + Id, Value);
            Length++;
            values.set(userId + ":LinkedList:Diary:meta:Length", Length.toString());

            this.pushTail(userId, Id);
        }
        else
        {
            this.removeCache(userId, Id);
            this.pushTail(userId, Id);
        }
    }

    public void Debuging(Integer userId)
    {
        ValueOperations<String, Object> values = redisTemplate.opsForValue();
        String Head = values.get(userId + ":LinkedList:Diary:Head").toString();
//        while ()
    }
    public void pushTail(String userId, String Id)
    {
        ValueOperations<String, Object> values = redisTemplate.opsForValue();
        String tail = values.get(userId + ":LinkedList:Diary:Tail").toString();
        String tailBefore = values.get(userId + ":LinkedList:Diary:Tail:before").toString();
        values.set(userId + ":LinkedList:Diary:Tail:before", Id);
        values.set(userId + ":LinkedList:Diary:" + tailBefore  + ":next", Id);
    }

    public void PopHead(String userId)
    {
        ValueOperations<String, Object> values = redisTemplate.opsForValue();
        String head = values.get(userId + ":LinkedList:Diary:Head:next").toString();
        String nextHead = values.get(userId + ":LinkedList:Diary:Node:" + head + ":next").toString();
        values.set(userId + ":LinkedList:Diary:Head:next", nextHead);
        values.set(userId + ":LinkedList:Diary:Node:"+ nextHead +"before", "-1");
    }
    @Transactional
    public void removeCache(String userId, String Id)
    {
        ValueOperations<String, Object> values = redisTemplate.opsForValue();
        if ( values.get(userId + ":LinkedList:Diary:Node:" + Id).toString() == null )
        {
            return;
        }
        String NextNode = values.get(userId + ":LinkedList:Diary:Node:" + Id + ":next").toString();
        String BeforeNode = values.get(userId + ":LinkedList:Diary:Node:" + Id + ":before").toString();
        values.set(userId + ":LinkedList:Diary:Node:" + NextNode + ":before" , BeforeNode);
        values.set(userId + ":LinkedList:Diary:Node:" + BeforeNode + ":next", BeforeNode);
        redisTemplate.delete(userId + ":LinkedList:Diary:Node:" + Id);
    }


    public String getNode(String userId, String Id)
    {
        log.info("지금 이 노드가 있나 없나늘 나한테 물어보고 있다" + Id);
        ValueOperations<String, Object> values = redisTemplate.opsForValue();
        if (values.get(userId + ":LinkedList:Diary:Node:" + Id) == null)
        {
            log.info("없단");
            return "False";
        }
        log.info("있단");
        return values.get(userId + ":LinkedList:Diary:Node:" + Id).toString();

    }
}
