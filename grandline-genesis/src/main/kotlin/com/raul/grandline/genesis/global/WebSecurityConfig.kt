package com.raul.grandline.genesis.global

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain

@Configuration
class WebSecurityConfig {
    @Bean @Profile("local")
    fun localSecurityWebFilterChain(
        http: HttpSecurity
    ): SecurityFilterChain {
        http.cors { it.disable() }
            .csrf { it.disable() }
            .sessionManagement{ it.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
            .authorizeHttpRequests { request -> request
                .requestMatchers("/**").permitAll()
            }
        return http.build()
    }
    @Bean
    fun securityWebFilterChain(
        http: HttpSecurity
    ): SecurityFilterChain {
        http
            .authorizeHttpRequests { request -> request
                .requestMatchers("/api/v1/**").permitAll()
                .requestMatchers("/actuator/**").hasRole(Role.ADMIN.value)
            }
        return http.build()
    }
}

enum class Role(val value: String) {
    ADMIN("admin")
}