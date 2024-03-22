package com.a304.mozzi.domain.diary.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DiaryInputDto {
    private MultipartFile photo;
    private String photoDate;
    private String foodName;
}
