package com.cntt2.product.repository;

import com.cntt2.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, String> {
    List<Product> findByIdIn(List<String> idList);
}
