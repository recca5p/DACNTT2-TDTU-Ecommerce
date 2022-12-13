package com.cntt2.order.controller;

import java.math.BigDecimal;

public record OrderRequestProduct (
        Long id,
        String name,
        String image,
        BigDecimal price,
        Integer quantity
) {

}
