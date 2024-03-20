package com.a304.mozzi;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@CrossOrigin("*")
public class test {
    @GetMapping("/test")
    public String testRequest(HttpServletRequest request) {
        log.info("test request : {}", request.getPathInfo());
        request.getHeaderNames().asIterator()
                .forEachRemaining(s -> log.info("test header {} : {}", s, request.getHeader(s)));
        return "Success";
    }
}
