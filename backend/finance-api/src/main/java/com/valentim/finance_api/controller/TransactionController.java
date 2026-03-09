package com.valentim.finance_api.controller;

import com.valentim.finance_api.dto.BalanceDTO;
import com.valentim.finance_api.dto.CategorySummaryDTO;
import com.valentim.finance_api.model.Transaction;
import com.valentim.finance_api.model.Transaction.TransactionType;
import com.valentim.finance_api.service.TransactionService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService service;

    @PostMapping
    public Transaction create(@Valid @RequestBody Transaction transaction) {
        return service.create(transaction);
    }

    @GetMapping
    public List<Transaction> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
        return service.getTransactionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransactionById(@PathVariable Long id) {
        if (service.deleteTransactionById(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> update(@PathVariable Long id, @Valid @RequestBody Transaction transaction) {
        return service.update(id, transaction)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Transaction>> filter(
            @RequestParam(required = false) TransactionType type,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate) {

        if (type != null) {
            List<Transaction> result = service.filterByType(type);
            return ResponseEntity.ok(result);
        }

        if (startDate != null && endDate != null) {
            List<Transaction> result = service.filterByDateBetween(startDate, endDate);
            return ResponseEntity.ok(result);
        }

        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/balance")
    public ResponseEntity<BalanceDTO> balance() {
        BalanceDTO result = service.getBalance();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/by-category")
    public ResponseEntity<List<CategorySummaryDTO>> byCategory() {
        List<CategorySummaryDTO> result = service.getExpensesByCategory();
        return ResponseEntity.ok(result);
    }

}
