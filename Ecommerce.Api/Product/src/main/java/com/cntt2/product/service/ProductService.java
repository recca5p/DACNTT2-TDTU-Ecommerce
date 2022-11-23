package com.cntt2.product.service;

import com.cntt2.product.controller.ProductRequest;
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

    public Product createProduct(ProductRequest request) {

        Product product = Product.builder()
                .name(request.name())
                .price(request.price())
                .brand(request.brand())
                .category(request.category())
                .thumbnail(request.thumbnail())
                .build();

        return productRepository.save(product);
    }

    public Product updateProduct(String productId, ProductRequest request) {
        Product productData = productRepository.findById(productId).orElseThrow(
                () -> new IllegalStateException("Product ID: " + productId + "not found!")
        );

        productData.setName(request.name());
        productData.setPrice(request.price());
        productData.setBrand(request.brand());
        productData.setCategory(request.category());
        productData.setThumbnail(request.thumbnail());

        return productRepository.save(productData);
    }

    public void deleteProduct(String productId) {
        boolean isExists = productRepository.existsById(productId);
        if(!isExists) {
            throw new IllegalStateException(
                    "Product ID: " + productId + "not found!"
            );
        }
        productRepository.deleteById(productId);
    }
}
