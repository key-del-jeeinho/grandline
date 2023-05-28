package com.raul.grandline.genesis.account.domain

import java.util.UUID

data class Account(
    val uuid: UUID,
    val identifier: AccountIdentifier,
    val encodedPassword: AccountEncodedPassword,
) {
    companion object
}
