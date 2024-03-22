package com.a304.mozzi.global.log;

import com.a304.mozzi.global.dto.AccessResponseDto;
import com.a304.mozzi.global.dto.ErrorResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class LogController {

    private final LogService logService;

    @GetMapping("/errorLog")
    public List<ErrorResponseDto> getError() {
        return logService.loadErrorLog();
    }

    @GetMapping("/accessLog")
    public List<AccessResponseDto> getAccessLog() {
        return logService.loadAccessLog();
    }
}
