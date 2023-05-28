package com.raul.grandline.genesis.account.domain.create

import com.raul.grandline.genesis.account.domain.Account
import java.util.UUID

class AccountCreatedEventBuilder {
    infix fun by(data: Account): AccountCreatedEvent {
        return AccountCreatedEvent(
            uuid = UUID.randomUUID(),
            identifier = data.identifier,
            encodedPassword = data.encodedPassword,
        )
    }
    companion object {
        infix fun create(
            account: AccountCreatedEvent.Companion,
        ): AccountCreatedEventBuilder = AccountCreatedEventBuilder()
    }
}
