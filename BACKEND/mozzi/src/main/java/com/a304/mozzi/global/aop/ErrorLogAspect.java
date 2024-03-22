package com.a304.mozzi.global.aop;

import com.a304.mozzi.global.log.LogService;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class ErrorLogAspect {

    private final LogService logService;

    @Before(value = "execution(* com.a304.mozzi.global.error.ExceptionController.*(..))")
    public void ErrorLong(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
        logService.saveErrorLog((Exception) args[0]);
    }
}
