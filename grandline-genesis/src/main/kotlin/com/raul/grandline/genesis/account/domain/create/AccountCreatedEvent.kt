package com.raul.grandline.genesis.account.domain.create

import com.raul.grandline.genesis.account.domain.common.AccountEncodedPassword
import com.raul.grandline.genesis.account.domain.common.AccountIdentifier
import java.util.UUID

data class AccountCreatedEvent(
    val uuid: UUID,
    val identifier: AccountIdentifier,
    val encodedPassword: AccountEncodedPassword
) {
    companion object
}
