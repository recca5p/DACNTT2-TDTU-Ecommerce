package com.cntt2.product.controller;

import com.cntt2.product.model.Product;
import com.cntt2.product.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/v1/order")
public record ProductController(ProductService productService) {

    //get all orders
    @GetMapping
    public List<Product> getOrders() {
        return productService.getProducts();
    }

    //get single order
    @GetMapping(path = "{orderId}")
    public Product getSingleOrder(@PathVariable("orderId") String id) {
        return productService.getSingleProduct(id);
    }

}
