package com.valentim.finance_api.service;

import com.valentim.finance_api.dto.BalanceDTO;
import com.valentim.finance_api.dto.CategorySummaryDTO;
import com.valentim.finance_api.model.Transaction;
import com.valentim.finance_api.model.Transaction.TransactionType;
import com.valentim.finance_api.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository repository;

    public Transaction create(Transaction transaction) {
        return repository.save(transaction);
    }

    public List<Transaction> getAll() {
        return repository.findAll();
    }

    public Optional<Transaction> getTransactionById(Long id) {
        return repository.findById(id);
    }

    public Optional<Transaction> update(Long id, Transaction transaction) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setDescription(transaction.getDescription());
                    existing.setAmount(transaction.getAmount());
                    existing.setDate(transaction.getDate());
                    existing.setType(transaction.getType());

                    return repository.save(existing);
                });
    }

    public boolean deleteTransactionById(Long id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }

    public List<Transaction> filterByType(TransactionType type) {
        return repository.findByType(type);
    }

    public List<Transaction> filterByDateBetween(LocalDate start, LocalDate end) {
        return repository.findByDateBetween(start, end);
    }

    public BalanceDTO getBalance() {

        List<Transaction> transactions = repository.findAll();

        BigDecimal totalIncome = BigDecimal.ZERO;
        BigDecimal totalExpense = BigDecimal.ZERO;

        for (Transaction transaction : transactions) {
            if (transaction.getType() == TransactionType.INCOME) {
                totalIncome = totalIncome.add(transaction.getAmount());
            } else if (transaction.getType() == TransactionType.EXPENSE) {
                totalExpense = totalExpense.add(transaction.getAmount());
            }
        }

        BigDecimal balance = totalIncome.subtract(totalExpense);
        return new BalanceDTO(totalIncome, totalExpense, balance);

    }

    public List<CategorySummaryDTO> getExpensesByCategory() {
        List<Transaction> transactions = repository.findAll();

        Map<String, BigDecimal> categoryTotals = new HashMap<>();

        for (Transaction transaction : transactions) {
            if (transaction.getCategory() != null) {
                String categoryName = transaction.getCategory().getName();
                BigDecimal currentTotal = categoryTotals.getOrDefault(categoryName, BigDecimal.ZERO);
                BigDecimal newTotal = currentTotal.add(transaction.getAmount());
                categoryTotals.put(categoryName, newTotal);
            }
        }

        List<CategorySummaryDTO> result = new ArrayList<>();

        for (Map.Entry<String, BigDecimal> entry : categoryTotals.entrySet()) {
            String categoryName = entry.getKey();
            BigDecimal total = entry.getValue();

            CategorySummaryDTO dto = new CategorySummaryDTO(categoryName, total);
            result.add(dto);

        }

        return result;
    }

}
