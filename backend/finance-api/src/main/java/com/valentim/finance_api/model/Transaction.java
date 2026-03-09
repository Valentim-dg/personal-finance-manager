package com.valentim.finance_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "transactions")
@Data
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String description;

    @NotNull
    @Positive
    private BigDecimal amount;

    @NotNull
    @PastOrPresent
    private LocalDate date;

    @NotNull
    @Enumerated(EnumType.STRING)
    private TransactionType type;

    public enum TransactionType {
        INCOME, EXPENSE
    }

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}