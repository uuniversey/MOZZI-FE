package com.a304.mozzi;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class test {

    public void testRequest(HttpServletRequest request) {
        log.info("test request : {}", request.getPathInfo());
        request.getHeaderNames().asIterator()
                .forEachRemaining(s -> log.info("test header {} : {}", s, request.getHeader(s)));
    }
}
