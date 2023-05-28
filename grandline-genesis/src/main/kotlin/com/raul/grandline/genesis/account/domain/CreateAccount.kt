package com.raul.grandline.genesis.account.domain

data class CreateAccount(
    val identifier: AccountIdentifier,
    val rawPassword: AccountRawPassword,
)
