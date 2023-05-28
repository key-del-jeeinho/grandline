package com.raul.grandline.genesis.account.domain

import java.util.UUID

class Account(
    private val uuid: UUID,
    private val identifier: String,
    private val encodedPassword: String,
)
