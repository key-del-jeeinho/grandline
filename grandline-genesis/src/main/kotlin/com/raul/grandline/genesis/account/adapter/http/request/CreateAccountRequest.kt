package com.raul.grandline.genesis.account.adapter.http.request

import com.fasterxml.jackson.annotation.JsonProperty

data class CreateAccountRequest(
    val identifier: String,
    @JsonProperty("password")
    val rawPassword: String,
)
