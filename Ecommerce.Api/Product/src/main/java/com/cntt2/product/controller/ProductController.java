package com.cntt2.product.controller;

import com.cntt2.product.dto.ProductRequest;
import com.cntt2.product.model.Product;
import com.cntt2.product.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/v1/product")
public record ProductController(ProductService productService) {

    //get all products
    @GetMapping
    public List<Product> getProducts(@RequestParam(name = "id", required = false) List<String> idList) {
        return productService.getProducts(idList);
    }

    //get single product
    @GetMapping(path = "{productId}")
    public Product getSingleProduct(@PathVariable("productId") String id) {
        return productService.getSingleProduct(id);
    }

    //create product
    @PostMapping
    public Product createProduct(
            @RequestBody ProductRequest productRequest,
            @RequestAttribute String userId
    ) {
        log.info("New product created {}", productRequest);
        return productService.createProduct(productRequest, userId);
    }

    //update product
    @PutMapping(path = "{productId}")
    public Product updateProduct(
            @PathVariable("productId") String id,
            @RequestBody ProductRequest productRequest,
            @RequestAttribute String userId
    ) {
        return productService.updateProduct(id, productRequest, userId);
    }

    //delete product
    @DeleteMapping(path = "{productId}")
    public void deleteProduct(@PathVariable("productId") String id) {
        productService.deleteProduct(id);
    }
}
