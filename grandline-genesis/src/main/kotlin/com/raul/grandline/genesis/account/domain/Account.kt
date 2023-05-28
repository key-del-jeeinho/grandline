package com.raul.grandline.genesis.account.domain

import com.raul.grandline.genesis.account.domain.common.AccountEncodedPassword
import com.raul.grandline.genesis.account.domain.common.AccountIdentifier
import java.util.UUID

data class Account(
    val uuid: UUID,
    val identifier: AccountIdentifier,
    val encodedPassword: AccountEncodedPassword
) {
    companion object
}
