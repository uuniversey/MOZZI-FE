package com.a304.mozzi.global.log;

import com.a304.mozzi.global.dto.AccessResponseDto;
import com.a304.mozzi.global.dto.ErrorResponseDto;
import com.a304.mozzi.global.error.ExceptionEntity;
import com.a304.mozzi.global.error.ExceptionRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LogService {

    private final ExceptionRepository exceptionRepository;
    private final AccessRepository accessRepository;

    public void saveErrorLog (Exception exception) {
        exceptionRepository.save(ExceptionEntity.of(exception));
    }

    public void saveAccessLog (HttpServletRequest request, long elapsedTime) {
        accessRepository.save(AccessEntity.of(request, elapsedTime));
    }

    public List<ErrorResponseDto> loadErrorLog () {
        return exceptionRepository.findAll().stream()
                .sorted(Comparator.comparing(ExceptionEntity::getErrorId).reversed())
                .limit(10)
                .map(ErrorResponseDto::toDto)
                .toList();
    }

    public List<AccessResponseDto> loadAccessLog() {
        return accessRepository.findAll().stream()
                .sorted(Comparator.comparing(AccessEntity::getAccessId).reversed())
                .limit(10)
                .map(AccessResponseDto::toDto)
                .toList();
    }
}
