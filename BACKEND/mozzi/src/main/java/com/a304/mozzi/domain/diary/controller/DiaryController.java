package com.a304.mozzi.domain.diary.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.a304.mozzi.domain.diary.dto.DiaryDto;
import com.a304.mozzi.domain.diary.model.Diary;
import com.a304.mozzi.domain.diary.service.DiaryService;
import com.a304.mozzi.domain.user.model.UserModel;
import com.a304.mozzi.domain.user.service.UserService;
import com.a304.mozzi.global.dto.ResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
        // 
        return  ResponseEntity.status(HttpStatus.OK).body(DiariesDto);
    }

    @PostMapping("/myDiary")
    public ResponseDto postMethodName(@RequestBody MultipartFile file) {
        //TODO: process POST request
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();
        Optional<UserModel> userOptional = userService.findByUserCode(username);
        UserModel user = null;
        if (userOptional.isPresent()) {
            user = userOptional.get();
        }

        String sourceFileName = file.getOriginalFilename();
        String sourceFileNameExtension = FilenameUtils.getExtension(sourceFileName).toLowerCase();
        String fileUrl = "이미지 저장 주소";
        String destinationFileName = RandomStringUtils.randomAlphabetic(32) + "." + sourceFileNameExtension;
        File destinationFile = new File(fileUrl + destinationFileName);
        destinationFile.getParentFile().mkdirs();
        file.transferTo(destinationFile);


        return ;
    }
    
}
