package com.raul.grandline.genesis.account.adapter.http.response

import java.util.UUID

data class CreateAccountResponse(
    val uuid: UUID,
    val identifier: String,
) {
    companion object
}
