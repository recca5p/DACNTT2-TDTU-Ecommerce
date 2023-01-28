package com.cntt2.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cntt2.order.model.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findByCreatedBy(String createdBy);
    List<Order> findByStatusInAndCreatedBy(List<String> status, String createdBy);
}
