package com.a304.mozzi.global.filter;

import com.a304.mozzi.global.log.LogService;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class LogFilter implements Filter {

    private static final String START = "start";
    private final LogService logService;


    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        handleRequest(request);
        filterChain.doFilter(servletRequest, servletResponse);
    }

    void handleRequest(HttpServletRequest request) {
        if (!Objects.equals(DispatcherType.ERROR, request.getDispatcherType())) {
            HttpSession session;
            if ((session = request.getSession(false)) == null) {
                session = request.getSession(true);
                session.setAttribute(START, System.currentTimeMillis());
            } else if (Objects.nonNull(session.getAttribute(START))) {
                long elapsedTime = System.currentTimeMillis() - (long) session.getAttribute(START);
                logService.saveAccessLog(request, elapsedTime);
            }
        }
    }

}
