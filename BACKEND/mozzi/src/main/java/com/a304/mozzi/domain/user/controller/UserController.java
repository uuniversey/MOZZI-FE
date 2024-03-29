package com.a304.mozzi.domain.user.controller;

import com.a304.mozzi.config.jwt.JwtIssuer;
import com.a304.mozzi.config.kakao.KakaoApi;
import com.a304.mozzi.config.security.UserPrincipal;
import com.a304.mozzi.domain.foods.model.Food;
import com.a304.mozzi.domain.foods.service.FoodService;
import com.a304.mozzi.domain.ingredients.model.IngredientsModel;
import com.a304.mozzi.domain.ingredients.service.IngrdientsService;
import com.a304.mozzi.domain.user.customfood.dto.UserFoodInpDto;
import com.a304.mozzi.domain.user.customfood.model.UserFood;
import com.a304.mozzi.domain.user.customfood.repository.UserFoodRepository;
import com.a304.mozzi.domain.user.customfood.service.UserFoodService;
import com.a304.mozzi.domain.user.customingredient.dto.IngredientsListDto;
import com.a304.mozzi.domain.user.customingredient.dto.UserIngredientDto;
import com.a304.mozzi.domain.user.customingredient.model.UserIngredientModel;
import com.a304.mozzi.domain.user.customingredient.repository.UserIngredientRepository;
import com.a304.mozzi.domain.user.dto.LoginResponseDto;
import com.a304.mozzi.domain.user.dto.UserIsVeganDto;
import com.a304.mozzi.domain.user.dto.UserNicknameDto;
import com.a304.mozzi.domain.user.dto.UserProfileDto;
import com.a304.mozzi.domain.user.model.UserModel;
import com.a304.mozzi.domain.user.service.UserService;
import com.a304.mozzi.global.dto.ResponseDto;

import com.a304.mozzi.global.dto.ResponseMessageDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.apache.commons.logging.Log;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final KakaoApi kakaoApi;
    private final JwtIssuer jwtIssuer;
    private final FoodService foodService;
    private  final  IngrdientsService ingredientsService;
    private final UserIngredientRepository userIngredientRepository;
    private  final UserFoodService userFoodService;
    @GetMapping("/Oauth2/KakaoLogin")
    public ResponseEntity<java.util.Map<String, String>> ClientKakaoLogin() {
        // TODO: process POST request
        // RestTemplate restTemplate = new RestTemplate();
        // ResponseEntity<String> response =
        // restTemplate.getForEntity("https://kauth.kakao.com/oauth/authorize",
        // String.class);
        // return response;
        java.util.Map<String, String> links = new HashMap<>();
        links.put("link", "https://kauth.kakao.com/oauth/authorize");
        links.put("redirect", "http://localhost:8080/auth/Oauth2/KakaoWeb");
        // links.put("redirect", "http://localhost:3000/auth");

        return ResponseEntity.status(HttpStatus.OK).body(links);
    }

    @GetMapping("/Oauth2/KakaoToken")
    public ResponseEntity<?> login(@RequestParam("code") String code) {
        try {

            log.info(code);
            String[] whatIneed = code.split("\\.");

            KakaoApi.KakaoOpenIdToken kakaoOpenIdToken = kakaoApi
                    .getOpenIdToken(new String(Base64.getDecoder().decode(whatIneed[1]), StandardCharsets.UTF_8));
            if (!userService.existsByUserCode(kakaoOpenIdToken.getSub())) {

                UserModel user = UserModel.builder()
                        .userCode(kakaoOpenIdToken.getSub())
                        .build();

                UserModel registerUserModel = userService.create(user);
                var MyAccesstoken = jwtIssuer.issue(registerUserModel.getUserId(),
                        registerUserModel.getUserCode(),
                        // Arrays.stream(registerUserModel.getRole().split(", "))
                        // .collect((Collectors.toList()))
                        List.of("ROLE_GUEST")

                );
                userFoodService.createWholeRelation(registerUserModel.getUserId());
                Map<String, String> token = new HashMap<>();
                token.put("accessToken", MyAccesstoken);
                token.put("refreshToken", MyAccesstoken);

                LoginResponseDto.LoginInfo loginInfo = new LoginResponseDto.LoginInfo();
                loginInfo.setIsRegistered(false);
                loginInfo.setNickname("");

                LoginResponseDto loginResponse = LoginResponseDto.builder().token(token).info(loginInfo).build();
                ResponseMessageDto responseMessageDto = ResponseMessageDto.builder().message("회원가입 완료").data(loginResponse).build();
                return ResponseEntity.ok().body(responseMessageDto);
            } else {
                Optional<UserModel> userOptional = userService.findByUserCode(kakaoOpenIdToken.getSub());
                UserModel user = null;
                if (userOptional.isPresent()) {
                    user = userOptional.get();
                }

                var authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(kakaoOpenIdToken.getSub(), "mozzi"));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                var principal = (UserPrincipal) authentication.getPrincipal();

                var roles = principal.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .toList();
                var MyAccesstoken = jwtIssuer.issue(user.getUserId(), user.getUserCode(), List.of("ROLE_GUEST"));

                Map<String, String> token = new HashMap<>();
                token.put("accessToken", MyAccesstoken);
                token.put("refreshToken", MyAccesstoken);
                LoginResponseDto.LoginInfo loginInfo = new LoginResponseDto.LoginInfo();
                loginInfo.setIsRegistered(true);
                loginInfo.setNickname(user.getUserNickname());

                ResponseMessageDto responseMessageDto = ResponseMessageDto.builder().message("로그인 완료").data(
                        LoginResponseDto.builder()
                                .token(token)
                                .info(loginInfo)
                                .build()).build();
                return ResponseEntity.ok().body(responseMessageDto);
            }
        } catch (Exception e) {
            ResponseDto responseDTO = ResponseDto.builder().error(e.getMessage()).build();
            return ResponseEntity
                    .badRequest()
                    .body(responseDTO);
        }
    }

    @DeleteMapping("/deleteuser")
    public  ResponseEntity<?> deleteAccount()
    {
        try {
            UserModel user = userService.findCurrentUser();
            userService.delete(user);

            return ResponseEntity.ok(HttpStatus.NO_CONTENT);
        } catch (Exception e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
    @GetMapping("/Oauth2/KakaoWeb")
    public ResponseEntity<?> loginForWeb(@RequestParam("code") String code) {
        try {
         log.info(code);
            KakaoApi.OAuthToken token = kakaoApi.getOAuthToken(code);
            String str = token.getId_token();
            log.info(str);
            String[] whatIneed = str.split("\\.");

            KakaoApi.KakaoOpenIdToken kakaoOpenIdToken = kakaoApi
                    .getOpenIdToken(new String(Base64.getDecoder().decode(whatIneed[1]), StandardCharsets.UTF_8));
            if (!userService.existsByUserCode(kakaoOpenIdToken.getSub())) {

                UserModel user = UserModel.builder()
                        .userCode(kakaoOpenIdToken.getSub())
                        .build();

                UserModel registerUserModel = userService.create(user);
                var MyAccesstoken = jwtIssuer.issue(registerUserModel.getUserId(),
                        registerUserModel.getUserCode(),
                        // Arrays.stream(registerUserModel.getRole().split(", "))
                        // .collect((Collectors.toList()))
                        List.of("ROLE_GUEST")

                );
                Map<String, String> tokenContainer = new HashMap<>();
                tokenContainer.put("accessToken", MyAccesstoken);
                tokenContainer.put("refreshToken", MyAccesstoken);

                LoginResponseDto.LoginInfo loginInfo = new LoginResponseDto.LoginInfo();
                loginInfo.setIsRegistered(false);
                loginInfo.setNickname("");
                userFoodService.createWholeRelation(registerUserModel.getUserId());
                LoginResponseDto loginResponse = LoginResponseDto.builder().token(tokenContainer).info(loginInfo).build();
                ResponseMessageDto responseMessageDto = ResponseMessageDto.builder().message("회원가입 완료").data(loginResponse).build();
                return ResponseEntity.ok().body(responseMessageDto);
            } else {
                log.info(code);
                Optional<UserModel> userOptional = userService.findByUserCode(kakaoOpenIdToken.getSub());
                UserModel user = null;
                if (userOptional.isPresent()) {
                    user = userOptional.get();
                }

                var authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(kakaoOpenIdToken.getSub(), "mozzi"));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                var principal = (UserPrincipal) authentication.getPrincipal();

                var roles = principal.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .toList();
                var MyAccesstoken = jwtIssuer.issue(user.getUserId(), user.getUserCode(), List.of("ROLE_GUEST"));

                Map<String, String> tokenContainer = new HashMap<>();
                tokenContainer.put("accessToken", MyAccesstoken);
                tokenContainer.put("refreshToken", MyAccesstoken);

                LoginResponseDto.LoginInfo loginInfo = new LoginResponseDto.LoginInfo();
                loginInfo.setIsRegistered(true);
                loginInfo.setNickname("");

                ResponseMessageDto responseMessageDto = ResponseMessageDto.builder().message("로그인 완료").data(
                        LoginResponseDto.builder()
                                .token(tokenContainer)
                                .info(loginInfo)
                                .build()).build();
                return ResponseEntity.ok().body(responseMessageDto);
            }
        } catch (Exception e) {
            ResponseDto responseDTO = ResponseDto.builder().error(e.getMessage()).build();
            return ResponseEntity
                    .badRequest()
                    .body(responseDTO);
        }
    }

    @GetMapping("/getUserProfile")
    ResponseEntity<?> getUserProfile() {
        try
        {
            UserModel user = userService.findCurrentUser();
            List<UserIngredientModel> userIngredientModels = userIngredientRepository.findUserIngredientModelsByUser(user);
            List<UserIngredientDto> userIngredientDtoList = new ArrayList<>();
            for (UserIngredientModel userIngredientModel : userIngredientModels)
            {
                log.info(userIngredientModel.getIngredients().getIngredientName() + "입니다");
                UserIngredientDto userIngredientDto = UserIngredientDto.builder().ingredientName(userIngredientModel.getIngredients().getIngredientName()).isLike(userIngredientModel.getIsLike()).build();
                userIngredientDtoList.add(userIngredientDto);
            }
            UserProfileDto userProfileDto = UserProfileDto.builder().id(user.getUserId()).isVegan(user.getUserIsvegan()).nickname(user.getUserNickname()).foods(userIngredientDtoList).build();
            return ResponseEntity.ok().body(userProfileDto);
        } catch (Exception e)
        {
            log.info(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 여기서부터 뭘 할 거냐면 id 토큰을 받아서 그대로 분해만 하는작업
    @PatchMapping("/setvegan")
    ResponseEntity<?> setVegan(@RequestBody UserIsVeganDto isVeganBody) {
        UserModel user = userService.findCurrentUser();
        log.info(String.valueOf(isVeganBody.getIsVegan()));
        userService.setUserIsVegan(user, isVeganBody.getIsVegan());
        Map<String, Boolean> result = new HashMap<>();
        result.put("isVegan", isVeganBody.getIsVegan());
        return ResponseEntity.ok().body(result);
    }

    @PatchMapping("/setnickname")
    ResponseEntity<?> setNickname(@RequestBody UserNicknameDto nickname) {
        log.info(nickname.getNickname());
        UserModel user = userService.findCurrentUser();
        userService.setUserNickname(user, nickname.getNickname());
        Map<String, String> result = new HashMap<>();
        result.put("nickname", nickname.getNickname());
        return ResponseEntity.ok().body(result);
    }
//
//    @PostMapping("/signup/setfood")
//    ResponseEntity<?> addFoodPreference(@RequestParam List<UserFoodInpDto> listInp) {
//        try {
//            UserModel user = userService.findCurrentUser();
//            for (UserFoodInpDto userFoodInpDto : listInp) {
//                Food food = foodService.findFoodByFoodName(userFoodInpDto.getFoodName());
//                UserFood userFood = UserFood.builder()
//                        .food(food)
//                        .user(user)
//                        .userFoodPreference(userFoodInpDto.getValue())
//                        .build();
//                userFoodRepository.save(userFood);
//            }
//            return ResponseEntity.ok(HttpStatus.CREATED);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//
//    }
//
//    @DeleteMapping("/signup/setfood")
//    ResponseEntity<?> removeFoodPreference(@RequestParam List<UserFoodInpDto> listInp) {
//        try {
//            UserModel user = userService.findCurrentUser();
//            for (UserFoodInpDto userFoodInpDto : listInp) {
//                Food food = foodService.findFoodByFoodName(userFoodInpDto.getFoodName());
//                UserFood userFood = userService.findUserFoodByUserAndFood(user, food);
//                userFoodRepository.save(userFood);
//            }
//            return ResponseEntity.ok(HttpStatus.NO_CONTENT);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

    @PostMapping("/setfood")
    @Transactional
    ResponseEntity<?> addIsLike(@RequestBody IngredientsListDto listInp) {
        try {

            UserModel user = userService.findCurrentUser();
            userIngredientRepository.deleteAllByUser(user);
            for (UserFoodInpDto userFoodInpDto : listInp.getFoods()) {

                IngredientsModel ingredientsModel =ingredientsService.findIngredientsByIngredientsName(userFoodInpDto.getFoodName());
                log.info(userFoodInpDto.getFoodName());
//              Food food = foodService.findFoodByFoodName(userFoodInpDto.getFoodName());
                UserIngredientModel userIngredientModel = UserIngredientModel.builder()
                        .user(user)
                        .ingredients(ingredientsModel)
                        .isLike(userFoodInpDto.getValue())
                        .build();
//                UserFood userFood = UserFood.builder()
//                        .food(food)
//                        .user(user)
//                        .userFoodPreference(userFoodInpDto.getValue())
//                        .build();

                userIngredientRepository.save(userIngredientModel);
            }
            ResponseMessageDto responseMessageDto = ResponseMessageDto.builder().message("Item Created").build();
            return ResponseEntity.ok().body(responseMessageDto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @DeleteMapping("/setfood")
    ResponseEntity<?> removeIsLike(@RequestParam List<UserFoodInpDto> listInp) {
        try {
            UserModel user = userService.findCurrentUser();
            for (UserFoodInpDto userFoodInpDto : listInp) {
                IngredientsModel ingredientsModel =ingredientsService.findIngredientsByIngredientsName(userFoodInpDto.getFoodName());
                UserIngredientModel userIngredientModel = userService.findUserIngredientModelByUserAndIngredients(user, ingredientsModel);
                userService.userIngredientModelDelete(userIngredientModel);
            }
            ResponseMessageDto responseMessageDto = ResponseMessageDto.builder().message("Item Deleted").build();
            return ResponseEntity.ok().body(responseMessageDto);
//            return ResponseEntity.ok(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
