package com.raul.grandline.genesis.account.adapter.http

import com.raul.grandline.genesis.account.adapter.http.request.CreateAccountRequest
import com.raul.grandline.genesis.account.domain.common.AccountIdentifier
import com.raul.grandline.genesis.account.domain.common.AccountRawPassword
import com.raul.grandline.genesis.account.domain.create.CreateAccount

class CreateAccountRequestConverter(
    private val createAccountRequest: CreateAccountRequest
) {
    infix fun to(toWhat: CreateAccount.Companion): CreateAccount = createAccountRequest.run {
        CreateAccount(
            identifier = AccountIdentifier(identifier),
            rawPassword = AccountRawPassword(rawPassword)
        )
    }

    companion object {
        infix fun convert(
            createAccountRequest: CreateAccountRequest
        ): CreateAccountRequestConverter = CreateAccountRequestConverter(createAccountRequest)
    }
}
