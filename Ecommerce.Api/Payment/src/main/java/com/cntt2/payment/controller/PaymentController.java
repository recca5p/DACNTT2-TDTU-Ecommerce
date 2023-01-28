package com.cntt2.payment.controller;

import com.cntt2.payment.dto.PaymentRequest;
import com.cntt2.payment.model.Payment;
import com.cntt2.payment.serivce.PaymentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/v1/payment")
public record PaymentController(PaymentService paymentService) {

    //get all payment
    @GetMapping
    public List<Payment> getProducts(@RequestAttribute String userId) {
        return paymentService.getPayments(userId);
    }

    //get single payment
    @GetMapping(path = "{paymentId}")
    public Payment getSinglePayment(
            @PathVariable("paymentId") String id,
            @RequestAttribute String userId
    ) {
        return paymentService.getSinglePayment(id, userId);
    }

    //create payment
    @PostMapping
    public Payment createPayment(
            @RequestBody PaymentRequest paymentRequest,
            @RequestAttribute String userId
    ) {
        return paymentService.createPayment(paymentRequest, userId);
    }

    //update payment
    @PutMapping(path = "{paymentId}")
    public Payment updateProduct(
            @PathVariable("paymentId") String id,
            @RequestBody PaymentRequest paymentRequest,
            @RequestAttribute String userId
    ) {
        return paymentService.updatePayment(id, paymentRequest, userId);
    }

    //delete payment
    @DeleteMapping(path = "{paymentId}")
    public void deletePayment(@PathVariable("paymentId") String id) {
        paymentService.deletePayment(id);
    }
}
