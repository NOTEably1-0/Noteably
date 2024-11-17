package com.g3appdev.noteably.noteably.Aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    @After("execution(* com.g3appdev.noteably.noteably.Controller.*.*(..))")
    public void logAfter(JoinPoint joinPoint) {
        System.out.println("Accessed: " + joinPoint.getSignature().getName());
    }
}