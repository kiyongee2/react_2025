package com.springboot.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	
	private final CustomUserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(PasswordEncoder encoder) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(encoder);
        return authProvider;
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // React 요청 처리 위해 비활성화
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/members/**").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form.disable()) // 프론트엔드에서 처리하므로 비활성화
            .logout(logout -> logout
                .logoutUrl("/api/members/logout")
                .logoutSuccessHandler((req, res, auth) -> res.setStatus(200))
                .deleteCookies("JSESSIONID")
            )
            .authenticationProvider(authenticationProvider(passwordEncoder()))
            .cors(cors -> {}); // CORS 기본 설정

        return http.build();
    }
}
