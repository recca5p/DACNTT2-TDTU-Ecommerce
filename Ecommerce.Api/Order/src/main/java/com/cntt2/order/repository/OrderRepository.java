package com.cntt2.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cntt2.order.model.Order;

public interface OrderRepository extends JpaRepository<Order, String> {
}
