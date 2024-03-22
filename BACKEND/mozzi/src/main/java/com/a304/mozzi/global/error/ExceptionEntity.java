package com.a304.mozzi.global.error;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.Date;
import java.util.stream.Collectors;
@Table(name = "error_log")
@Getter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class ExceptionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private final Integer errorId;
    private final Date time;
    private final String errorClass;
    private final String errorMessage;
    private final String errorLogs;

    public static ExceptionEntity of(Exception e) {
        String logs = Arrays.stream(e.getStackTrace())
                .map(trace -> trace.getClassName() + " - " + trace.getMethodName())
                .collect(Collectors.joining("|"));

        return ExceptionEntity.builder()
                .time(new Date())
                .errorClass(e.getClass().getSimpleName())
                .errorMessage(e.getMessage())
                .errorLogs(logs)
                .build();
    }
}
