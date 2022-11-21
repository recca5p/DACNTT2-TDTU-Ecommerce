package com.cntt2.product.service;

import com.cntt2.product.model.Product;
import com.cntt2.product.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public record ProductService(ProductRepository productRepository) {

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product getSingleProduct(String productId) {
        return productRepository.findById(productId).orElseThrow(
                () -> new IllegalStateException("Product ID: " + productId + "not found!")
        );
    }
}
