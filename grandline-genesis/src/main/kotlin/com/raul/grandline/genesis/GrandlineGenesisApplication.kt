package com.raul.grandline.genesis

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity

@SpringBootApplication
@EnableWebSecurity
class GrandlineGenesisApplication

fun main(args: Array<String>) {
    runApplication<GrandlineGenesisApplication>(*args)
}
