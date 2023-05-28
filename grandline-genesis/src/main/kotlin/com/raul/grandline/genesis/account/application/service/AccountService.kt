package com.raul.grandline.genesis.account.application.service

import com.raul.grandline.genesis.account.application.port.input.CreateAccountUseCase
import com.raul.grandline.genesis.account.application.port.input.EncodePasswordOutput
import com.raul.grandline.genesis.account.application.port.input.EncodePasswordOutput.Companion.invoke
import com.raul.grandline.genesis.account.application.service.SaveAccountOutput.Companion.invoke
import com.raul.grandline.genesis.account.domain.Account
import com.raul.grandline.genesis.account.domain.AccountBuilder.Companion.create
import com.raul.grandline.genesis.account.domain.create.AccountCreatedEvent
import com.raul.grandline.genesis.account.domain.create.AccountCreatedEventBuilder.Companion.create
import com.raul.grandline.genesis.account.domain.create.CreateAccount
import com.raul.grandline.genesis.global.invoke
import org.springframework.context.ApplicationEventPublisher

class AccountService(
    private val encodePassword: EncodePasswordOutput,
    private val saveAccount: SaveAccountOutput,
    private val publishEvent: ApplicationEventPublisher
) : CreateAccountUseCase {
    override fun createAccount(domain: CreateAccount): Account {
        val encodedPassword = encodePassword(domain.rawPassword)
        val account = create(Account) by (domain to encodedPassword)
        val savedAccount = saveAccount(account)

        val event = create(AccountCreatedEvent) by savedAccount
        publishEvent(event)

        return savedAccount
    }
}
