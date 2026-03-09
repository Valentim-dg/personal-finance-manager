package com.valentim.finance_api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class BalanceDTO {
    private BigDecimal income;
    private BigDecimal expense;
    private BigDecimal balance;
}