package com.cntt2.order.controller;

import com.cntt2.order.model.OrderProductItem;

import java.math.BigDecimal;
import java.util.List;

public record OrderRequest (
        Integer status,
        BigDecimal total,
        List<OrderProductItem> products
) {

}

