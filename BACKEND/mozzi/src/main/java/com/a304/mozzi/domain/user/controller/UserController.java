package com.a304.mozzi.domain.user.controller;

import com.a304.mozzi.config.jwt.JwtIssuer;
import com.a304.mozzi.config.kakao.KakaoApi;
import com.a304.mozzi.config.security.UserPrincipal;
import com.a304.mozzi.domain.user.dto.LoginResponseDto;
import com.a304.mozzi.domain.user.model.UserModel;
import com.a304.mozzi.domain.user.service.UserService;
import com.a304.mozzi.global.dto.ResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private  final KakaoApi kakaoApi;
    private  final JwtIssuer jwtIssuer;
    @GetMapping("Oauth2/KakaoLogin")
    public ResponseEntity<java.util.Map<String,String>>  ClientKakaoLogin() {
        //TODO: process POST request
    //     RestTemplate restTemplate = new RestTemplate();
    //     ResponseEntity<String> response = restTemplate.getForEntity("https://kauth.kakao.com/oauth/authorize", String.class);
    //     return response;
    java.util.Map<String, String> links = new HashMap<>();
    links.put("link", "https://kauth.kakao.com/oauth/authorize");
    links.put("redirect", "http://localhost:8080/auth/Oauth2/KakaoToken");
    // links.put("redirect", "http://localhost:3000/auth");
    
    return ResponseEntity.status(HttpStatus.OK).body(links);
    }

    @GetMapping("/Oauth2/KakaoToken")
    public ResponseEntity<?> login(@RequestParam("code") String code) {
        try
        {
            // log.info(code);
            KakaoApi.OAuthToken token = kakaoApi.getOAuthToken(code);
            String str = token.getId_token();
            String[] whatIneed = str.split("\\.");
            KakaoApi.KakaoOpenIdToken kakaoOpenIdToken = kakaoApi.getOpenIdToken(new String(Base64.getDecoder().decode(whatIneed[1]), StandardCharsets.UTF_8));
            if (!userService.existsByUserCode(kakaoOpenIdToken.getSub()))
            {

                UserModel user = UserModel.builder()
                        .userCode(kakaoOpenIdToken.getSub())
                        .build();

                UserModel registerUserModel = userService.create(user);
                var MyAccesstoken = jwtIssuer.issue(registerUserModel.getUserId(),
                        registerUserModel.getUserCode(),
//                        Arrays.stream(registerUserModel.getRole().split(", "))
//                                .collect((Collectors.toList()))
                        List.of("ROLE_GUEST")

                );
                LoginResponseDto loginReqponse = LoginResponseDto.builder().accessToken(MyAccesstoken).build();
                return ResponseEntity.ok().body(loginReqponse);
            }
            else
            {
                Optional<UserModel> userOptional = userService.findByUserCode(kakaoOpenIdToken.getSub());
                UserModel user = null;
                if (userOptional.isPresent()) {
                    user = userOptional.get();
                }
                                
                
                var authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(kakaoOpenIdToken.getSub(), null));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                var principal = (UserPrincipal) authentication.getPrincipal();

                var roles = principal.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .toList();
                var MyAccesstoken = jwtIssuer.issue(user.getUserId(), user.getUserCode(), List.of("ROLE_GUEST"));
                return ResponseEntity.ok().body(LoginResponseDto.builder()
                        .accessToken(MyAccesstoken)
                        .build());
            }
        }
        catch (Exception e) {
            ResponseDto responseDTO = ResponseDto.builder().error(e.getMessage()).build();
            return ResponseEntity
                    .badRequest()
                    .body(responseDTO);
        }
    }
}
