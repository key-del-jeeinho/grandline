package com.raul.grandline.genesis.account.adapter.data

import com.raul.grandline.genesis.account.adapter.AccountConverter.Companion.convert
import com.raul.grandline.genesis.account.adapter.data.AccountEntityConverter.Companion.convert
import com.raul.grandline.genesis.account.adapter.data.entity.AccountEntity
import com.raul.grandline.genesis.account.adapter.data.repository.AccountRepository
import com.raul.grandline.genesis.account.application.port.output.SaveAccountOutput
import com.raul.grandline.genesis.account.domain.Account
import org.springframework.stereotype.Component

@Component
class AccountPersistenceAdapter(
    private val accountRepository: AccountRepository
) : SaveAccountOutput {
    override fun saveAccount(account: Account): Account {
        val entity = convert(account) to AccountEntity
        val savedEntity = accountRepository.save(entity)
        return convert(savedEntity) to Account
    }
}
