package com.a304.mozzi.config.jwt;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {
    @Bean
    public JwtDecoder jwtDecoder()
    {
        return new JwtDecoder();
    }

    @Bean
    public JwtToPrincipalConverter jwtToPrincipalConverter()
    {
        return new JwtToPrincipalConverter();
    }
}
