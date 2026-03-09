package com.valentim.finance_api.repository;

import com.valentim.finance_api.model.Transaction;
import com.valentim.finance_api.model.Transaction.TransactionType;
import java.util.List;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByType(TransactionType type);

    List<Transaction> findByDateBetween(LocalDate start, LocalDate end);
}
