package com.cntt2.order.controller;

import com.cntt2.order.model.Order;
import com.cntt2.order.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/v1/order")
public record OrderController(OrderService orderService) {

    //get all orders
    @GetMapping
    public List<Order> getOrders() {
        return orderService.getOrders();
    }

    //get single order
    @GetMapping(path = "{orderId}")
    public Order getSingleOrder(@PathVariable("orderId") String id) {
        return orderService.getSingleOrder(id);
    }

    //create order
    @PostMapping
    public Order createOrder(@RequestBody OrderRequest orderRequest) {
        log.info("New order created {}", orderRequest);
        return orderService.createOrder(orderRequest);
    }

    //update order
    @PutMapping(path = "{orderId}")
    public Order updateOrder(@PathVariable("orderId") String id, @RequestBody OrderRequest orderRequest) {
        return orderService.updateOrder(id, orderRequest);
    }

    //delete order
    @DeleteMapping(path = "{orderId}")
    public void deleteOrder(@PathVariable("orderId") String id) {
        orderService.deleteOrder(id);
    }
}
