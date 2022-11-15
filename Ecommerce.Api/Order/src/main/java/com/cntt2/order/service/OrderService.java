package com.cntt2.order.service;

import com.cntt2.order.controller.OrderRequest;
import com.cntt2.order.model.Order;
import com.cntt2.order.repository.OrderRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public record OrderService(OrderRepository orderRepository) {

    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    public Order getSingleOrder(String orderId) {
        return orderRepository.findById(orderId).orElseThrow(
                () -> new IllegalStateException("Order ID: " + orderId + "not found!")
        );
    }
    public Order createOrder(OrderRequest request) {

        Order order = Order.builder()
                .status(request.status())
                .total(request.total())
                .products(request.products())
                .build();

        return orderRepository.save(order);
    }

    public Order updateOrder(String orderId, OrderRequest request) {
        Order orderData = orderRepository.findById(orderId).orElseThrow(
                () -> new IllegalStateException("Order ID: " + orderId + "not found!")
        );

        orderData.setStatus(request.status());
        orderData.setTotal(request.total());
        orderData.setProducts(request.products());
        return orderRepository.save(orderData);
    }

    public void deleteOrder(String orderId) {
        boolean isExists = orderRepository.existsById(orderId);
        if(!isExists) {
            throw new IllegalStateException(
                    "Order ID: " + orderId + "not found!"
            );
        }
        orderRepository.deleteById(orderId);
    }
}
