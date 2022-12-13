package com.cntt2.order.service;

import com.cntt2.order.controller.OrderRequest;
import com.cntt2.order.controller.OrderRequestProduct;
import com.cntt2.order.dto.ProductResponse;
import com.cntt2.order.model.Order;

import com.cntt2.order.model.OrderProductItem;
import com.cntt2.order.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
import java.util.List;

@Service
@AllArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final WebClient.Builder webClientBuilder;

    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    public Order getSingleOrder(String orderId) {
        return orderRepository.findById(orderId).orElseThrow(
                () -> new IllegalStateException("Order ID: " + orderId + "not found!")
        );
    }
    public Order createOrder(OrderRequest request) {
        //request product => list product id
        List<String> idList = request.products().stream()
                .map(OrderProductItem::getId)
                .toList();

        //get products by id
        ProductResponse[] productResponseArray = webClientBuilder.build().get()
                .uri("http://product/api/v1/product",
                        uriBuilder -> uriBuilder.queryParam("id", idList).build())
                .retrieve()
                .bodyToMono(ProductResponse[].class)
                .block();

        //check quantity
        Arrays.stream(productResponseArray).forEach(product -> {
            OrderProductItem productInStock = (OrderProductItem) request.products().stream()
                    .filter(p -> p.getId().equals(product.getId()) && product.getQuantity() >= p.getQuantity())
                    .findFirst()
                    .orElse(null);

            if(productInStock == null) {
                throw new IllegalArgumentException("Product is not in stock, please try again later");
            }
        });

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
