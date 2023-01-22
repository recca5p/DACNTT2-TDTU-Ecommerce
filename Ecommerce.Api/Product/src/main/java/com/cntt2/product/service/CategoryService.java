package com.cntt2.product.service;

import com.cntt2.product.dto.CategoryRequest;
import com.cntt2.product.model.Category;
import com.cntt2.product.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;

@Service
@AllArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    public static String toSlug(String input) {
        String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }

    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    public Category getSingleCategory(String categoryId) {
        return categoryRepository.findById(categoryId).orElseThrow(
                () -> new IllegalStateException("Category ID: " + categoryId + "not found!")
        );
    }

    public Category createCategory(CategoryRequest request) {
        if(!request.parent().isEmpty()) {
            categoryRepository.findById(request.parent()).orElseThrow(
                    () -> new IllegalStateException("Parent category ID: " + request.parent() + "not found!")
            );
        }

        Category data = Category.builder()
                .name(request.name())
                .slug(toSlug(request.name()))
                .thumbnail(request.thumbnail())
                .parent(request.parent())
                .build();

        return categoryRepository.save(data);
    }

    public Category updateCategory(String id, CategoryRequest request) {
        Category data = categoryRepository.findById(id).orElseThrow(
                () -> new IllegalStateException("Category ID: " + id + "not found!")
        );

        if(!request.parent().isEmpty()) {
            categoryRepository.findById(request.parent()).orElseThrow(
                    () -> new IllegalStateException("Parent category ID: " + request.parent() + "not found!")
            );
        }

        data.setName(request.name());
        data.setThumbnail(request.thumbnail());
        data.setParent(request.parent());

        return categoryRepository.save(data);
    }

    public void deleteCategory(String id) {
        boolean isExists = categoryRepository.existsById(id);
        if(!isExists) {
            throw new IllegalStateException(
                    "Category ID: " + id + "not found!"
            );
        }
        categoryRepository.deleteById(id);
    }
}
