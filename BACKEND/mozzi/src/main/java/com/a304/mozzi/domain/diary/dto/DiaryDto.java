package com.a304.mozzi.domain.diary.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import com.a304.mozzi.domain.diary.model.Diary;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class DiaryDto{
    
    private Integer id;
    private String foodName;
    private String photoUrl;
    private LocalDate photoDate;

}
