package com.a304.mozzi.domain.diary.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.a304.mozzi.domain.diary.dto.DiaryDto;
import com.a304.mozzi.domain.diary.model.Diary;
import com.a304.mozzi.domain.diary.repository.DiaryRepositoty;
import com.a304.mozzi.domain.user.model.UserModel;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DiaryService {
    
    private final DiaryRepositoty diaryRepositoty;

    public List<Diary> findByUser(UserModel user)
    {
        return  diaryRepositoty.findByUser(user);
    }
      
    public List<DiaryDto> toDtoList(List<Diary> diaries)
    {
        return diaries.stream()
        .map(entity -> DiaryDto.builder()
        .photoUrl(entity.getDiaryPhoto())
        .build())
        .collect(Collectors.toList());
    }
}
