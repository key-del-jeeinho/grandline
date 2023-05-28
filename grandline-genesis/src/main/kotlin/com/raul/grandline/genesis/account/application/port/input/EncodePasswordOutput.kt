package com.raul.grandline.genesis.account.application.port.input

import com.raul.grandline.genesis.account.domain.common.AccountEncodedPassword
import com.raul.grandline.genesis.account.domain.common.AccountRawPassword

interface EncodePasswordOutput {
    fun encodePassword(rawPassword: AccountRawPassword): AccountEncodedPassword
    companion object {
        operator fun EncodePasswordOutput.invoke(
            rawPassword: AccountRawPassword,
        ): AccountEncodedPassword = encodePassword(rawPassword)
    }
}
