package com.cntt2.product.service;

import com.cntt2.product.dto.ProductRequest;
import com.cntt2.product.model.Brand;
import com.cntt2.product.model.Category;
import com.cntt2.product.model.Product;
import com.cntt2.product.repository.BrandRepository;
import com.cntt2.product.repository.CategoryRepository;
import com.cntt2.product.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;

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
        //find brand data
        Brand brandData = brandRepository.findById(request.brand()).orElseThrow(
                () -> new IllegalStateException("Brand ID: " + request.brand() + "not found!")
        );
        //find category data
        Category categoryData = categoryRepository.findById(request.category()).orElseThrow(
                () -> new IllegalStateException("Category ID: " + request.category() + "not found!")
        );

        Product product = Product.builder()
                .name(request.name())
                .price(request.price())
                .quantity(request.quantity())
                .brand(brandData)
                .category(categoryData)
                .thumbnail(request.thumbnail())
                .images(request.images())
                .createdBy(userId)
                .updatedBy(userId)
                .build();

        return productRepository.save(product);
    }

    public Product updateProduct(String productId, ProductRequest request, String userId) {
        //find product data
        Product productData = productRepository.findById(productId).orElseThrow(
                () -> new IllegalStateException("Product ID: " + productId + "not found!")
        );
        //find brand data
        Brand brandData = brandRepository.findById(request.brand()).orElseThrow(
                () -> new IllegalStateException("Brand ID: " + request.brand() + "not found!")
        );
        //find category data
        Category categoryData = categoryRepository.findById(request.category()).orElseThrow(
                () -> new IllegalStateException("Category ID: " + request.category() + "not found!")
        );

        productData.setName(request.name());
        productData.setPrice(request.price());
        productData.setQuantity(request.quantity());
        productData.setBrand(brandData);
        productData.setCategory(categoryData);
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
