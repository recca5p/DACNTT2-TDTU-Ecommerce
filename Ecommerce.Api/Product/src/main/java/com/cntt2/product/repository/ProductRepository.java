package com.cntt2.product.repository;

import com.cntt2.product.model.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, String> {
    Optional<Product> findBySlug(String slug);

    List<Product> findByIdIn(List<String> idList, Pageable pageable);

    List<Product> findBySlugContaining(String slug, Pageable pageable);

    List<Product> findByCategory_SlugIn(List<String> categories, Pageable pageable);

    List<Product> findBySlugContainingAndCategory_SlugIn(String slug, List<String> categories, Pageable pageable);
}
