package com.a304.mozzi.domain.user.dto;



import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Builder
@Setter
@Getter
public class LoginResponseDto {
    private Map<String, String> token;
    private LoginInfo info;

    @Getter
    @Setter
    public static class LoginInfo {
        private Boolean isRegistered;
        private String nickname;
    }
}
