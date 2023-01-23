package com.cntt2.product.repository;

import com.cntt2.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, String> {
    List<Product> findByIdIn(List<String> idList);

    List<Product> findBySlugContaining(String slug);

    List<Product> findByCategory_SlugIn(List<String> categories);

    List<Product> findBySlugContainingAndCategory_SlugIn(String slug, List<String> categories);
}
