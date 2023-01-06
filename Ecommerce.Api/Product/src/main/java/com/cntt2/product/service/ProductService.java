package com.cntt2.product.service;

import com.cntt2.product.dto.ProductRequest;
import com.cntt2.product.model.Product;
import com.cntt2.product.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> getProducts(List<String> idList) {
        if(idList == null || idList.isEmpty()) {
            return productRepository.findAll();
        }
        
        return productRepository.findByIdIn(idList);
    }

    public Product getSingleProduct(String productId) {
        return productRepository.findById(productId).orElseThrow(
                () -> new IllegalStateException("Product ID: " + productId + "not found!")
        );
    }

    public Product createProduct(ProductRequest request, String userId) {

        Product product = Product.builder()
                .name(request.name())
                .price(request.price())
                .quantity(request.quantity())
                .brand(request.brand())
                .category(request.category())
                .thumbnail(request.thumbnail())
                .images(request.images())
                .createdBy(userId)
                .updatedBy(userId)
                .build();

        return productRepository.save(product);
    }

    public Product updateProduct(String productId, ProductRequest request, String userId) {
        Product productData = productRepository.findById(productId).orElseThrow(
                () -> new IllegalStateException("Product ID: " + productId + "not found!")
        );

        productData.setName(request.name());
        productData.setPrice(request.price());
        productData.setQuantity(request.quantity());
        productData.setBrand(request.brand());
        productData.setCategory(request.category());
        productData.setThumbnail(request.thumbnail());
        productData.setImages(request.images());
        productData.setUpdatedBy(userId);

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
