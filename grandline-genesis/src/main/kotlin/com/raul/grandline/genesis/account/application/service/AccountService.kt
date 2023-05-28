package com.raul.grandline.genesis.account.application.service

import com.raul.grandline.genesis.account.application.port.input.CreateAccountUseCase
import com.raul.grandline.genesis.account.application.port.input.EncodePasswordOutput
import com.raul.grandline.genesis.account.application.port.input.EncodePasswordOutput.Companion.invoke
import com.raul.grandline.genesis.account.domain.Account
import com.raul.grandline.genesis.account.domain.AccountBuilder.Companion.create
import com.raul.grandline.genesis.account.domain.CreateAccount

class AccountService(
    private val encodePassword: EncodePasswordOutput
) : CreateAccountUseCase {
    override fun createAccount(domain: CreateAccount): Account {
        val encodedPassword = encodePassword(domain.rawPassword)
        val account = create(Account) by (domain to encodedPassword)
    }
}
