package com.a304.mozzi.config.security;

import com.a304.mozzi.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    public  final UserService userService;
    @Override
    public UserDetails loadUserByUsername(String userCode) throws UsernameNotFoundException {
        var user = userService.findByUserCode(userCode).orElseThrow();
        return  UserPrincipal.builder()
                .userId(user.getUserId())
                .userCode(user.getUserCode())
                .build();
    }
}
