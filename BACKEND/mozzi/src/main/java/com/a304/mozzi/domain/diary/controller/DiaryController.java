package com.a304.mozzi.domain.diary.controller;


import java.io.File;
import java.util.List;
import java.util.Optional;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.a304.mozzi.domain.diary.dto.DiaryDto;
import com.a304.mozzi.domain.diary.model.Diary;
import com.a304.mozzi.domain.diary.service.DiaryService;
import com.a304.mozzi.domain.user.model.UserModel;
import com.a304.mozzi.domain.user.service.UserService;
import com.a304.mozzi.global.dto.ResponseDto;
import com.a304.mozzi.global.dto.ResponseMessageDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.utility.RandomString;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("diary")
@CrossOrigin(origins = "http://localhost:3000")

public class DiaryController {
    private final DiaryService diaryService;
    private final UserService userService;
    @GetMapping("/mydiary")
    public ResponseEntity<List<DiaryDto>> GetMyDiary(){


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();


        Optional<UserModel> userOptional = userService.findByUserCode(username);
                UserModel user = null;
                if (userOptional.isPresent()) {
                    user = userOptional.get();
                }

        List<Diary> Diaries = diaryService.findByUser(user);
        
        List<DiaryDto> DiariesDto = diaryService.toDtoList(Diaries);
        return  ResponseEntity.status(HttpStatus.OK).body(DiariesDto);
    }

    @PostMapping("/myDiary")
    public ResponseMessageDto postMyDiary(
             @RequestParam("photo") MultipartFile photo,
            @RequestParam("photoDate") String photoDate,
            @RequestParam("foodName") String foodName
    ) 
    {
        try 
        {
            log.info("시작");
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            Optional<UserModel> userOptional = userService.findByUserCode(username);
            UserModel user = null;
            if (userOptional.isPresent()) {
                user = userOptional.get();
            }
            log.info(username);
            String sourceFileName = photo.getOriginalFilename();
            String sourceFileNameExtension = FilenameUtils.getExtension(sourceFileName).toLowerCase();
            String fileUrl = "C:\\Users\\SSAFY\\Downloads\\GOODCODE\\S2A304\\BACKEND\\public\\";
            String destinationFileName = RandomStringUtils.randomAlphabetic(32) + "." + sourceFileNameExtension;
            File destinationFile = new File(fileUrl + destinationFileName);
            if (!destinationFile.getParentFile().mkdirs()) {
                log.error("Failed to create directories for file: {}", destinationFile.getPath());
                // 에러 처리 로직 추가
            }

            destinationFile.getParentFile().mkdirs();

            log.info(destinationFileName);
            photo.transferTo(destinationFile);
            
            Diary diary = Diary.builder()
                .user(user)
                .diaryPhoto(fileUrl + destinationFileName)
                .build();
                
            Diary registeredDiary = diaryService.create(diary);

            ResponseMessageDto responseMessageDto = ResponseMessageDto.builder().message("201").build();
            return responseMessageDto;
        }
        catch (Exception e) 
        {
            ResponseMessageDto responseMessageDto = ResponseMessageDto.builder().message("404").build();
            return responseMessageDto;
        }
    }
    
}
