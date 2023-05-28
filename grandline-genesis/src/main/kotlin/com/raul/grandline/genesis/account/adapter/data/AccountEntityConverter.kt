package com.raul.grandline.genesis.account.adapter.data

import com.raul.grandline.genesis.account.adapter.data.entity.AccountEntity
import com.raul.grandline.genesis.account.domain.Account
import com.raul.grandline.genesis.account.domain.common.AccountEncodedPassword
import com.raul.grandline.genesis.account.domain.common.AccountIdentifier

class AccountEntityConverter(
    private val accountEntity: AccountEntity,
) {
    infix fun to(toWhat: Account.Companion): Account = accountEntity.run {
        Account(
            uuid = uuid,
            identifier = AccountIdentifier(identifier),
            encodedPassword = AccountEncodedPassword(encodedPassword),
        )
    }

    companion object {
        infix fun convert(
            accountEntity: AccountEntity,
        ): AccountEntityConverter = AccountEntityConverter(accountEntity)
    }
}