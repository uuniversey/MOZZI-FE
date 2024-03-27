package com.a304.mozzi.domain.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserNicknameDto {
    private String nickname;

    public UserNicknameDto()
    {

    }
    public UserNicknameDto(String Pos)
    {
        this.nickname = Pos;
    }
}
