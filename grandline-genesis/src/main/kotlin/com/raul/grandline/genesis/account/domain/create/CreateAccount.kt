package com.raul.grandline.genesis.account.domain.create

import com.raul.grandline.genesis.account.domain.common.AccountIdentifier
import com.raul.grandline.genesis.account.domain.common.AccountRawPassword

data class CreateAccount(
    val identifier: AccountIdentifier,
    val rawPassword: AccountRawPassword
) {
    companion object
}
