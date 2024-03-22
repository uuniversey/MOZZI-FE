package com.a304.mozzi.global.dto;

import com.a304.mozzi.global.error.ExceptionEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.StringTokenizer;

@Getter
@Builder
@AllArgsConstructor
public class ErrorResponseDto {

    private final Integer errorId;
    private final Date time;
    private final String errorClass;
    private final String errorMessage;
    private final List<String> errorLogs;

    public static ErrorResponseDto toDto (ExceptionEntity entity) {
        StringTokenizer stringTokenizer = new StringTokenizer(entity.getErrorLogs(), "|");
        ArrayList<String> logs = new ArrayList<>(stringTokenizer.countTokens());
        while (stringTokenizer.hasMoreTokens()) {
            logs.add(stringTokenizer.nextToken());
        }

        return ErrorResponseDto.builder()
                .errorId(entity.getErrorId())
                .time(entity.getTime())
                .errorClass(entity.getErrorClass())
                .errorMessage(entity.getErrorMessage())
                .errorLogs(logs)
                .build();
    }
}
