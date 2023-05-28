package com.raul.grandline.genesis.account.domain

import com.raul.grandline.genesis.account.domain.common.AccountEncodedPassword
import com.raul.grandline.genesis.account.domain.create.CreateAccount
import java.util.UUID

class AccountBuilder {
    infix fun by(data: Pair<CreateAccount, AccountEncodedPassword>): Account {
        return Account(
            uuid = UUID.randomUUID(),
            identifier = data.first.identifier,
            encodedPassword = data.second
        )
    }
    companion object {
        infix fun create(account: Account.Companion): AccountBuilder = AccountBuilder()
    }
}
