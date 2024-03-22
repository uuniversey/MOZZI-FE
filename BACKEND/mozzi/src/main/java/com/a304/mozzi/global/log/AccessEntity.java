package com.a304.mozzi.global.log;

import jakarta.persistence.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Enumeration;

@Table(name = "access_log")
@Getter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class AccessEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private final Integer accessId;
    private final Date time;
    private final String requestUri;
    private final Double elapsedTime;
    private final String headers;
    private final String attributes;

    public static AccessEntity of(HttpServletRequest request, long millisTime) {
        StringBuilder headers = new StringBuilder();
        Enumeration<String> headerNames = request.getHeaderNames();
        headerNames
                .asIterator()
                .forEachRemaining(header ->
                    headers.append(header).append(" : ").append(request.getHeader(header)).append("|"));

        StringBuilder attributes = new StringBuilder();
        Enumeration<String> attributeNames = request.getAttributeNames();
        attributeNames
                .asIterator()
                .forEachRemaining(name ->
                        attributes.append(name).append(" : ").append(request.getAttribute(name).toString()).append("|"));

        return AccessEntity.builder()
                .time(new Date())
                .requestUri(request.getMethod() + " " + request.getRequestURL().toString())
                .elapsedTime(Math.round(millisTime * 1000)/1000_000_000.0)
                .headers(headers.toString())
                .attributes(attributes.toString())
                .build();
    }
}
