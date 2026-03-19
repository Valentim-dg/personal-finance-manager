package com.valentim.finance_api.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.valentim.finance_api.model.Transaction;
import com.valentim.finance_api.model.Transaction.TransactionType;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByType(TransactionType type);
    List<Transaction> findByDateBetween(LocalDate start, LocalDate end);
    List<Transaction> findByCategoryId(Long categoryId);
}
