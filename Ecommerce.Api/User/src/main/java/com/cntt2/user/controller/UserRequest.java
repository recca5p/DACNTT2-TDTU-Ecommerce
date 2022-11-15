package com.cntt2.user.controller;

import java.math.BigDecimal;

public record UserRequest (
        String username,
        String password,
        String fullname,
        String avatar,
        BigDecimal balance
) {

}


