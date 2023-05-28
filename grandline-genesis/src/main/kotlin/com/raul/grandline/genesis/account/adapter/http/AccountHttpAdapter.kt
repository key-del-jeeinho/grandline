package com.raul.grandline.genesis.account.adapter.http

import com.raul.grandline.genesis.account.adapter.AccountConverter.Companion.convert
import com.raul.grandline.genesis.account.adapter.http.CreateAccountRequestConverter.Companion.convert
import com.raul.grandline.genesis.account.adapter.http.request.CreateAccountRequest
import com.raul.grandline.genesis.account.adapter.http.response.CreateAccountResponse
import com.raul.grandline.genesis.account.application.port.input.CreateAccountUseCase
import com.raul.grandline.genesis.account.application.port.input.CreateAccountUseCase.Companion.invoke
import com.raul.grandline.genesis.account.domain.create.CreateAccount
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController("/api/v1/account")
class AccountHttpAdapter(
    private val createAccount: CreateAccountUseCase
) {
    @PostMapping
    fun create(@RequestBody request: CreateAccountRequest): ResponseEntity<CreateAccountResponse> {
        val domain = convert(request) to CreateAccount
        val created = createAccount(domain)
        val response = convert(created) to CreateAccountResponse
        return ResponseEntity.ok(response)
    }
}
