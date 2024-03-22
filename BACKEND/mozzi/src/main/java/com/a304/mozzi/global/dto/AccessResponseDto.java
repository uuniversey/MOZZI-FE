package com.a304.mozzi.global.dto;

import com.a304.mozzi.global.log.AccessEntity;
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
public class AccessResponseDto {

    private final Integer accessId;
    private final Date time;
    private final String requestUri;
    private final Double elapsedTime;
    private final List<String> headers;
    private final List<String> attributes;

    public static AccessResponseDto toDto (AccessEntity entity) {
        StringTokenizer stringTokenizer = new StringTokenizer(entity.getHeaders(), "|");
        List<String> headers = new ArrayList<>(stringTokenizer.countTokens());
        while (stringTokenizer.hasMoreTokens()) {
            headers.add(stringTokenizer.nextToken());
        }

        List<String> attributes = new ArrayList<>(stringTokenizer.countTokens());
        while (stringTokenizer.hasMoreTokens()) {
            attributes.add(stringTokenizer.nextToken());
        }

        return AccessResponseDto.builder()
                .accessId(entity.getAccessId())
                .time(entity.getTime())
                .requestUri(entity.getRequestUri())
                .elapsedTime(entity.getElapsedTime())
                .headers(headers)
                .attributes(attributes)
                .build();
    }
}
