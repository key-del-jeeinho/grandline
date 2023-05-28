package com.raul.grandline.genesis.account.application.port.output

import com.raul.grandline.genesis.account.domain.Account

interface SaveAccountOutput {
    fun saveAccount(account: Account): Account
    companion object {
        operator fun SaveAccountOutput.invoke(
            account: Account
        ): Account = saveAccount(account)
    }
}
