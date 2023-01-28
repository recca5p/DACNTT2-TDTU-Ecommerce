package com.cntt2.payment.serivce;

import com.cntt2.payment.dto.PaymentRequest;
import com.cntt2.payment.model.Payment;
import com.cntt2.payment.repository.PaymentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;

    public List<Payment> getPayments(String userId) {
        return paymentRepository.findByUserId(userId);
    }

    public Payment getSinglePayment(String id, String userId) {
        return paymentRepository.findByIdAndUserId(id, userId).orElseThrow(
                () -> new IllegalStateException("Payment not found!")
        );
    }

    public Payment createPayment(PaymentRequest request, String userId) {
        Payment data = Payment.builder()
                .name(request.name())
                .type(request.type())
                .balance(request.balance())
                .userId(userId)
                .build();

        return paymentRepository.save(data);
    }

    public Payment updatePayment(
            String paymentId,
            PaymentRequest request,
            String userId
    ) {
        //find payment data
        Payment data = paymentRepository.findById(paymentId).orElseThrow(
                () -> new IllegalStateException("Payment ID: " + paymentId + "not found!")
        );

        if(request.name() != null) { data.setName(request.name()); }
        if(request.type() != null) { data.setType(request.type()); }
        if(request.balance() != null) { data.setBalance(request.balance()); }

        return paymentRepository.save(data);
    }

    public void deletePayment(String paymentId) {
        boolean isExists = paymentRepository.existsById(paymentId);
        if(!isExists) {
            throw new IllegalStateException(
                    "Payment ID: " + paymentId + "not found!"
            );
        }
        paymentRepository.deleteById(paymentId);
    }
}
