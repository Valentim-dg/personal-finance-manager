package com.valentim.finance_api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.valentim.finance_api.model.Category;
import com.valentim.finance_api.repository.CategoryRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repository;

    public Category create(Category category) {
        return repository.save(category);
    }

    public List<Category> getAll() {
        return repository.findAll();
    }

    public Optional<Category> getCategoryById(Long id) {
        return repository.findById(id);
    }

    public Optional<Category> update(Long id, Category category) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setName(category.getName());
                    existing.setDescription(category.getDescription());

                    return repository.save(existing);
                });
    }

    public boolean deleteCategoryById(Long id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }

}
