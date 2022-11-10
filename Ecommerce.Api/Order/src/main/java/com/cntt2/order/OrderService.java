package com.cntt2.order;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public record OrderService(OrderRepository orderRepository) {

    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getSingleOrder(String orderId) {
        return orderRepository.findById(orderId);
    }
    public void createOrder(OrderRequest request) {

        Order order = Order.builder()
                .total(request.total())
                .products(request.products())
                .build();

        orderRepository.save(order);
    }

//    public void updateOrder(String orderId, OrderRequest request) {
//
//    }

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
