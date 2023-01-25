package com.cntt2.product.service;

import com.cntt2.product.dto.ProductRequest;
import com.cntt2.product.model.Brand;
import com.cntt2.product.model.Category;
import com.cntt2.product.model.Product;
import com.cntt2.product.repository.BrandRepository;
import com.cntt2.product.repository.CategoryRepository;
import com.cntt2.product.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;

@Service
@AllArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    public static String toSlug(String input) {
        String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }

    public List<Product> getProducts(
            List<String> idList,
            String slug,
            String categorySlug
    ) {
        //create category slug list for filter
        List<String> categories = new ArrayList<>();
        if(categorySlug != null) {
            categories.add(categorySlug);

            Category categoryData = categoryRepository.findBySlug(categorySlug);
            if(categoryData != null && categoryData.getParent().isEmpty()) {
                List<Category> categoryChild = categoryRepository.findByParent(categoryData.getId());
                List<String> cateSlugs = categoryChild.stream()
                        .map(Category::getSlug)
                        .toList();
                categories = cateSlugs;
            }
        }

        //find products by slug
        if(slug != null) {
            //find products by slug and categories
            if(!categories.isEmpty()) {
                return productRepository.findBySlugContainingAndCategory_SlugIn(slug, categories);
            }

            return productRepository.findBySlugContaining(slug);
        }

        //find products by categories
        if(!categories.isEmpty()) {
            return productRepository.findByCategory_SlugIn(categories);
        }

        //find products by id
        if(idList != null) {
            return productRepository.findByIdIn(idList);
        }
        
        return productRepository.findAll();
    }

    public Product getSingleProduct(String productSlug) {
        return productRepository.findBySlug(productSlug).orElseThrow(
                () -> new IllegalStateException("Product not found!")
        );
    }

    public Product createProduct(ProductRequest request, String userId) {
        //find brand data
        Brand brandData = brandRepository.findById(request.brand()).orElseThrow(
                () -> new IllegalStateException("Brand ID: " + request.brand() + "not found!")
        );
        //find category data
        List<Category> cateList = new ArrayList<>();
        Category categoryChild = categoryRepository.findById(request.category()).orElseThrow(
                () -> new IllegalStateException("Category child ID: " + request.category() + "not found!")
        );
        cateList.add(categoryChild);

        if(!categoryChild.getParent().isEmpty()) {
            Category categoryParent = categoryRepository.findById(categoryChild.getParent()).orElseThrow(
                    () -> new IllegalStateException("Category parent ID: " + request.category() + "not found!")
            );
            cateList.add(categoryParent);
        }

        Product product = Product.builder()
                .name(request.name())
                .slug(toSlug(request.name()))
                .price(request.price())
                .condition(request.condition())
                .description(request.description())
                .quantity(request.quantity())
                .brand(brandData)
                .category(categoryChild)
                .thumbnail(request.thumbnail())
                .images(request.images())
                .createdBy(userId)
                .updatedBy(userId)
                .build();

        return productRepository.save(product);
    }

    public Product updateProduct(String productId, ProductRequest request, String userId) {
        //find product data
        Product productData = productRepository.findById(productId).orElseThrow(
                () -> new IllegalStateException("Product ID: " + productId + "not found!")
        );
        //find brand data
        Brand brandData = brandRepository.findById(request.brand()).orElseThrow(
                () -> new IllegalStateException("Brand ID: " + request.brand() + "not found!")
        );
        //find category data
        List<Category> cateList = new ArrayList<>();
        Category categoryChild = categoryRepository.findById(request.category()).orElseThrow(
                () -> new IllegalStateException("Category child ID: " + request.category() + "not found!")
        );
        cateList.add(categoryChild);

        if(!categoryChild.getParent().isEmpty()) {
            Category categoryParent = categoryRepository.findById(categoryChild.getParent()).orElseThrow(
                    () -> new IllegalStateException("Category parent ID: " + request.category() + "not found!")
            );
            cateList.add(categoryParent);
        }

        productData.setName(request.name());
        productData.setSlug(toSlug(request.name()));
        productData.setPrice(request.price());
        productData.setCondition(request.condition());
        productData.setDescription(request.description());
        productData.setQuantity(request.quantity());
        productData.setBrand(brandData);
        productData.setCategory(categoryChild);
        productData.setThumbnail(request.thumbnail());
        productData.setImages(request.images());
        productData.setUpdatedBy(userId);

        return productRepository.save(productData);
    }

    public void deleteProduct(String productId) {
        boolean isExists = productRepository.existsById(productId);
        if(!isExists) {
            throw new IllegalStateException(
                    "Product ID: " + productId + "not found!"
            );
        }
        productRepository.deleteById(productId);
    }
}
