package com.cntt2.product.controller;

import java.math.BigDecimal;
import java.util.List;

public record ProductRequest (
    String name,
    BigDecimal price,
    Integer quantity,
    String brand,
    String category,
    String thumbnail,
    List<String> images
) {

}
