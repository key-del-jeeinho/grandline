package com.raul.grandline.genesis.account.application.port.input

import com.raul.grandline.genesis.account.domain.Account
import com.raul.grandline.genesis.account.domain.CreateAccount

interface CreateAccountUseCase {
    fun createAccount(domain: CreateAccount): Account
    companion object {
        operator fun CreateAccountUseCase.invoke(domain: CreateAccount): Account = createAccount(domain)
    }
}
