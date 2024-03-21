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
import com.a304.mozzi.domain.user.customingredient.model.UserIngredientModel;
import com.a304.mozzi.domain.user.customingredient.repository.UserIngredientRepository;
import com.a304.mozzi.domain.user.dto.LoginResponseDto;
import com.a304.mozzi.domain.user.model.UserModel;
import com.a304.mozzi.domain.user.service.UserService;
import com.a304.mozzi.global.dto.ResponseDto;

import com.a304.mozzi.global.dto.ResponseMessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

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
    private final UserFoodRepository userFoodRepository;
    private  final  IngrdientsService ingredientsService;
    private final UserIngredientRepository userIngredientRepository;
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
        links.put("redirect", "http://localhost:8080/auth/Oauth2/KakaoToken");
        // links.put("redirect", "http://localhost:3000/auth");

        return ResponseEntity.status(HttpStatus.OK).body(links);
    }

    @GetMapping("/Oauth2/KakaoToken")
    public ResponseEntity<?> login(@RequestParam("code") String code) {
        try {
            // log.info(code);
//            KakaoApi.OAuthToken token = kakaoApi.getOAuthToken(code);
//            String str = token.getId_token();
//            log.info(str);
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
                loginInfo.setNickname("");

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


    // 여기서부터 뭘 할 거냐면 id 토큰을 받아서 그대로 분해만 하는작업
    @PatchMapping("/setvegan")
    ResponseEntity<?> setVegan(@RequestParam boolean isVegan) {
        UserModel user = userService.findCurrentUser();
        userService.setUserIsVegan(user, isVegan);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PatchMapping("/setnickname")
    ResponseEntity<?> setNickname(@RequestParam String nickname) {
        UserModel user = userService.findCurrentUser();
        userService.setUserNickname(user, nickname);
        Map<String, String> result = new HashMap<>();
        result.put("nickname", nickname);
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
    ResponseEntity<?> addIsLike(@RequestParam List<UserFoodInpDto> listInp) {
        try {
            UserModel user = userService.findCurrentUser();
            for (UserFoodInpDto userFoodInpDto : listInp) {

                IngredientsModel ingredientsModel =ingredientsService.findIngredientsByIngredientsName(userFoodInpDto.getFoodName());
//                Food food = foodService.findFoodByFoodName(userFoodInpDto.getFoodName());
                UserIngredientModel userIngredientModel = UserIngredientModel.builder()
                        .user(user)
                        .ingredients(ingredientsModel)
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
