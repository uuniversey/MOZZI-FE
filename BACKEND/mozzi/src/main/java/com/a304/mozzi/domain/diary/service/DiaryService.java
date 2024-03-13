package com.a304.mozzi.domain.diary.service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.a304.mozzi.domain.diary.dto.DiaryDto;
import com.a304.mozzi.domain.diary.model.Diary;
import com.a304.mozzi.domain.diary.repository.DiaryRepositoty;
import com.a304.mozzi.domain.user.model.UserModel;
import com.fasterxml.jackson.databind.RuntimeJsonMappingException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DiaryService {
    
    private final DiaryRepositoty diaryRepositoty;

    public Diary create(final Diary diary)
    {
        if (diary == null || diary.getDiaryPhoto() == null)
        {
            throw new RuntimeJsonMappingException("Invalid argument");
        }
        return diaryRepositoty.save(diary);
    }

    public Integer getTotalCount(Integer userId) {
        return diaryRepositoty.getTotalCount(userId);
    }
    public List<Diary> findByUser(UserModel user)
    {
        return  diaryRepositoty.findByUser(user);
    }


      
    public List<DiaryDto> toDtoList(List<Diary> diaries)
    {
        if (diaries == null)
        {
            return Collections.emptyList();
        }
        return diaries.stream()
        .map(entity -> DiaryDto.builder()
            .id(entity.getDiaryId())
            .photoUrl(entity.getDiaryPhoto())
            .build())
        .collect(Collectors.toList());
    }

    public void deleteByDiaryId(Integer diaryId)
    {
        Diary diary = diaryRepositoty.findById(diaryId)
                .orElseThrow(() -> new IllegalArgumentException("Diary with id " + diaryId + " not found"));
        diaryRepositoty.deleteById(diaryId);
    }
}
