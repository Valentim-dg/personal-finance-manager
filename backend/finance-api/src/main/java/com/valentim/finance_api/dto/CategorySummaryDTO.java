package com.valentim.finance_api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class CategorySummaryDTO {
    private String categoryName;
    private BigDecimal total;
}