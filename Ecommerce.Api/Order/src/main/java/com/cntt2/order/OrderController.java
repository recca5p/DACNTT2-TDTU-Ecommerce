package com.cntt2.order;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public Optional<Order> getSingleOrder(@PathVariable("orderId") String id) {
        return orderService.getSingleOrder(id);
    }

    //create order
    @PostMapping
    public void createOrder(@RequestBody OrderRequest orderRequest) {
        log.info("New order created {}", orderRequest);
        orderService.createOrder(orderRequest);
    }

    //update order
//    @PutMapping(path = "{orderId}")
//    public void updateOrder(@PathVariable("orderId") String id, @RequestBody OrderRequest orderRequest) {
//        orderService.updateOrder(id, orderRequest);
//    }

    //delete order
    @DeleteMapping(path = "{orderId}")
    public void deleteOrder(@PathVariable("orderId") String id) {
        orderService.deleteOrder(id);
    }
}
