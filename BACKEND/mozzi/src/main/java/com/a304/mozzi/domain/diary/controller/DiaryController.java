package com.a304.mozzi.domain.diary.controller;

import java.io.File;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import com.a304.mozzi.domain.diary.dto.DiaryFoodListDto;
import com.a304.mozzi.domain.diary.dto.DiaryInputDto;
import com.a304.mozzi.domain.foods.model.Food;
import com.a304.mozzi.domain.foods.service.FoodService;
import com.a304.mozzi.domain.redis.model.LinkedList;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.a304.mozzi.domain.diary.dto.DiaryDto;
import com.a304.mozzi.domain.diary.model.Diary;
import com.a304.mozzi.domain.diary.service.DiaryService;
import com.a304.mozzi.domain.user.model.UserModel;
import com.a304.mozzi.domain.user.service.UserService;
import com.a304.mozzi.global.dto.ResponseMessageDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("diary")
@CrossOrigin(origins = "http://localhost:3000")

public class DiaryController {
    private final DiaryService diaryService;
    private final UserService userService;
    private final FoodService foodService;
    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucket;
    private  final AmazonS3Client amazonS3Client;
    private  final LinkedList linkedList;
    private  final ObjectMapper objectMapper;

    @GetMapping("/getmydiary")
    public ResponseEntity<DiaryFoodListDto> GetMyDiary(
            @RequestParam("foodYear") String foodYear,
            @RequestParam("foodMonth") String foodMonth) {

        UserModel user = userService.findCurrentUser();
        List<Diary> Diaries = diaryService.findByUserAndDiaryDate(user.getUserId(), foodYear, foodMonth);
        List<DiaryDto> DiariesDto = diaryService.toDtoList(Diaries);
        DiaryFoodListDto diaryFoodLists = DiaryFoodListDto.builder().foods(DiariesDto).build();
        return ResponseEntity.status(HttpStatus.OK).body(diaryFoodLists);
    }
//    @RequestParam("photo") MultipartFile photo,
//    @RequestParam("photoDate") String photoDate,
//    @RequestParam("foodName") String foodName)
    @PostMapping("/setmydiary")
    public ResponseEntity<?> postMyDiary(
            @ModelAttribute DiaryInputDto diaryInputDto
            ) {
        try {
            MultipartFile photo = diaryInputDto.getPhoto();
            String photoDate = diaryInputDto.getPhotoDate();
            String foodName = diaryInputDto.getFoodName();
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            Optional<UserModel> userOptional = userService.findByUserCode(username);
            UserModel user = null;
            if (userOptional.isPresent()) {
                user = userOptional.get();
            }
            String sourceFileName = photo.getOriginalFilename();
            String sourceFileNameExtension = FilenameUtils.getExtension(sourceFileName).toLowerCase();
            // String fileUrl = "C:\\Users\\SSAFY\\Downloads\\GOODCODE\\S2A304\\BACKEND\\public\\";
            String fileUrl = "https://" + bucket +".s3.ap-northeast-2.amazonaws.com" + "/";
            String destinationFileName = RandomStringUtils.randomAlphabetic(5) + "_" + username + "_" + photoDate + "."
                    + sourceFileNameExtension;

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(photo.getContentType());
            metadata.setContentLength(photo.getSize());
            amazonS3Client.putObject(bucket, destinationFileName, photo.getInputStream() ,metadata);
//            File destinationFile = new File(fileUrl + destinationFileName);
//
//            if (!destinationFile.getParentFile().exists()) {
//                if (!destinationFile.getParentFile().mkdirs()) {
//                    log.error("Failed to create directories for file: {}", destinationFile.getPath());
//                    // 에러 처리 로직 추가
//                }
//            }
//
//            // destinationFile.getParentFile().mkdirs();
//            photo.transferTo(destinationFile);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            // log.info(photoDate);

            //
            // try {
            // LocalDateTime parsedDateTime = LocalDateTime.parse(photoDate, formatter);
            // log.info("Parsed LocalDateTime: " + parsedDateTime.toString());
            //
            // // 이후 로직 계속...
            // } catch (DateTimeParseException e) {
            // log.error("Failed to parse photoDate: " + photoDate, e);
            // // 예외 처리 로직 추가
            // }

            LocalDate parsedDate = LocalDate.parse(photoDate, formatter);
            LocalDateTime parsedDateTime = parsedDate.atStartOfDay();

            log.info(parsedDateTime.toString());
            Food food = foodService.findFoodByFoodName(foodName);

            Diary diary = Diary.builder()
                    .user(user)
                    .diaryPhoto(fileUrl + destinationFileName)
                    .diaryDate(parsedDateTime)
                    .foodId(food)
                    .build();


            Diary registeredDiary = diaryService.create(diary);
            ResponseMessageDto responseMessageDto = ResponseMessageDto.builder().message("Diary Created").build();


            return ResponseEntity.ok().body(responseMessageDto);
        } catch (Exception e) {
            ResponseMessageDto responseMessageDto = ResponseMessageDto.builder().message("Diary Create failed").build();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
}

    @GetMapping("/getDetailDiary")
    public ResponseEntity<?> getDetailDiary()
    {
        UserModel user = userService.findCurrentUser();
        List<Diary> Diaries = diaryService.findByUser(user);
        List<DiaryDto> DiariesDto = diaryService.toDtoList(Diaries);
        log.info("REDIS에 저장되었음");
        DiaryFoodListDto diaryFoodLists = DiaryFoodListDto.builder().foods(DiariesDto).build();
        return ResponseEntity.status(HttpStatus.OK).body(diaryFoodLists);
    }



    @GetMapping("/getMyWholeDiary")
    public ResponseEntity<?> getMyWholeDiary()
    {
        UserModel user = userService.findCurrentUser();
        List<Diary> Diaries = diaryService.findByUser(user);
        List<DiaryDto> DiariesDto = diaryService.toDtoList(Diaries);
        DiaryFoodListDto diaryFoodLists = DiaryFoodListDto.builder().foods(DiariesDto).build();
        return ResponseEntity.status(HttpStatus.OK).body(diaryFoodLists);
    }

    @DeleteMapping("/deletemydiary")
    public ResponseEntity<?> deleteMyDiary(@RequestParam Integer id) {
        diaryService.deleteByDiaryId(id);
        ResponseMessageDto responseMessageDto = ResponseMessageDto.builder().message("diary deleted").build();
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(responseMessageDto);
    }

    @GetMapping("/getOneDiary")
    public ResponseEntity<?> getOneAndCache(@RequestParam Integer id) throws JsonProcessingException {
        UserModel userModel = userService.findCurrentUser();
        String isThereCached = linkedList.getNode(userModel.getUserCode().toString(), id.toString());
        if (isThereCached == "False")
        {
            Diary diary = diaryService.findByDiaryId(id);

            DiaryDto diaryDto = DiaryDto.builder()
                    .id(diary.getDiaryId())
                    .foodName(diary.getFoodId().getFoodName())
                    .photoUrl(diary.getDiaryPhoto())
                    .photoDate(diary.getDiaryDate().toLocalDate())
                    .build();

            String json = objectMapper.writeValueAsString(diaryDto);
            linkedList.InsertNewCache(userModel.getUserCode().toString(), diary.getDiaryId().toString(), json);
            return ResponseEntity.ok().body(diaryDto);
        }
        else
        {
            DiaryDto diaryDto = objectMapper.readValue(isThereCached, DiaryDto.class);
            return ResponseEntity.ok().body(diaryDto);
        }
    }


    @GetMapping("/getrandomdiaries")
    public ResponseEntity<?> getTwoDiaries() {
        // 해당유저의 최대 테이블 개수를 알아야겠지
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();
        Optional<UserModel> userOptional = userService.findByUserCode(username);

        UserModel user = null;
        if (userOptional.isPresent()) {
            user = userOptional.get();
        }
        List<Diary> Diaries = diaryService.findByUser(user);
        List<Diary> retDiaries = new ArrayList<Diary>();

        if (Diaries.size() > 2) {
            Random random = new Random();

            // 리스트에서 인덱스 두 개를 랜덤하게 선택
            int index1 = random.nextInt(Diaries.size());
            int index2 = random.nextInt(Diaries.size());
            retDiaries.add(Diaries.get(index1));
            retDiaries.add(Diaries.get(index2));
        } else if (Diaries.size() == 1) {
            retDiaries.add(Diaries.get(0));
        }
        List<DiaryDto> DiariesDto = diaryService.toDtoList(retDiaries);
        DiaryFoodListDto diaryFoodLists = DiaryFoodListDto.builder().foods(DiariesDto).build();
        return ResponseEntity.status(HttpStatus.OK).body(diaryFoodLists);
    }
}
