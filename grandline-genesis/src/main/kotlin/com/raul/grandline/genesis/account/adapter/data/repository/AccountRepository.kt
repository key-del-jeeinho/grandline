package com.raul.grandline.genesis.account.adapter.data.repository

import com.raul.grandline.genesis.account.adapter.data.entity.AccountEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface AccountRepository : JpaRepository<AccountEntity, UUID>
