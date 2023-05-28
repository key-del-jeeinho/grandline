package com.raul.grandline.genesis.account.adapter.data.entity

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import org.hibernate.annotations.Comment
import java.util.UUID

@Entity
@Table(name = "account")
class AccountEntity(
    @Id
    @Comment("식별자")
    val uuid: UUID,
    @Comment("계정 아이디")
    val identifier: String,
    @Comment("계정 비밀번호 (encoded)")
    val encodedPassword: String
) {
    companion object
}
