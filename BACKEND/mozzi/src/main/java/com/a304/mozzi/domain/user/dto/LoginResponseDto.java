package com.a304.mozzi.domain.user.dto;



import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Setter
@Getter
public class LoginResponseDto {
    private  String accessToken;
}
