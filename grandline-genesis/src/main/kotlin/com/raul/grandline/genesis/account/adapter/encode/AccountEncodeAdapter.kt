package com.raul.grandline.genesis.account.adapter.encode

import com.raul.grandline.genesis.account.application.port.output.EncodePasswordOutput
import com.raul.grandline.genesis.account.domain.common.AccountEncodedPassword
import com.raul.grandline.genesis.account.domain.common.AccountRawPassword
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component

@Component
class AccountEncodeAdapter(
    private val passwordEncoder: PasswordEncoder
) : EncodePasswordOutput {
    override fun encodePassword(rawPassword: AccountRawPassword): AccountEncodedPassword {
        val encoded = passwordEncoder.encode(rawPassword.value)
        return AccountEncodedPassword(encoded)
    }
}
