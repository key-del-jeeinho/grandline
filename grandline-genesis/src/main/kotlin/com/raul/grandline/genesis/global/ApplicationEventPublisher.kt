package com.raul.grandline.genesis.global

import org.springframework.context.ApplicationEventPublisher

operator fun ApplicationEventPublisher.invoke(event: Any) = publishEvent(event)
