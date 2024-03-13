package com.a304.mozzi.domain.diary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.a304.mozzi.domain.diary.model.Diary;
import java.util.List;
import com.a304.mozzi.domain.user.model.UserModel;



@Repository
public interface DiaryRepositoty extends JpaRepository<Diary, Integer>{
    Diary findByDiaryId(Integer diaryId);  

    List<Diary> findByUser(UserModel user);

    @Query(value = "select count(*) from diary where diary.user_id = :userId", nativeQuery = true)
    Integer getTotalCount(Integer userId);
} 
