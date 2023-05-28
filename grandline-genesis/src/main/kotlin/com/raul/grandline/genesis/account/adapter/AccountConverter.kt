package com.raul.grandline.genesis.account.adapter

import com.raul.grandline.genesis.account.adapter.data.entity.AccountEntity
import com.raul.grandline.genesis.account.domain.Account

class AccountConverter(
    private val account: Account,
) {
    infix fun to(toWhat: AccountEntity.Companion): AccountEntity = account.run {
        AccountEntity(
            uuid = uuid,
            identifier = identifier.value,
            encodedPassword = encodedPassword.value,
        )
    }

    companion object {
        infix fun convert(account: Account): AccountConverter = AccountConverter(account)
    }
}