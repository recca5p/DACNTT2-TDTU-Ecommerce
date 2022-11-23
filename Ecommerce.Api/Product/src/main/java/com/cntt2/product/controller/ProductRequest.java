package com.cntt2.product.controller;

import java.math.BigDecimal;

public record ProductRequest (
    String name,
    BigDecimal price,
    String brand,
    String category,
    String thumbnail
) {

}
