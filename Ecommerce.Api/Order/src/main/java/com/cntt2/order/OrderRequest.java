package com.cntt2.order;

import java.util.List;

public record OrderRequest (
    Integer total,
    List<OrderProductItem> products
) {

}

