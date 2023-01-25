package com.cntt2.product.service;

import com.cntt2.product.dto.BrandRequest;
import com.cntt2.product.model.Brand;
import com.cntt2.product.repository.BrandRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;

@Service
@AllArgsConstructor
public class BrandService {
    private final BrandRepository brandRepository;

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    public static String toSlug(String input) {
        String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH);
    }

    public List<Brand> getBrands() {
        return brandRepository.findAll();
    }

    public Brand getSingleBrand(String brandId) {
        return brandRepository.findById(brandId).orElseThrow(
                () -> new IllegalStateException("Brand ID: " + brandId + "not found!")
        );
    }

    public Brand createBrand(BrandRequest request) {
        Brand brand = Brand.builder()
                .name(request.name())
                .slug(request.name())
                .thumbnail(request.thumbnail())
                .build();

        return brandRepository.save(brand);
    }

    public Brand updateBrand(String brandId, BrandRequest request) {
        Brand brandData = brandRepository.findById(brandId).orElseThrow(
                () -> new IllegalStateException("Brand ID: " + brandId + "not found!")
        );

        brandData.setName(request.name());
        brandData.setSlug(request.name());
        brandData.setThumbnail(request.thumbnail());

        return brandRepository.save(brandData);
    }

    public void deleteBrand(String brandId) {
        boolean isExists = brandRepository.existsById(brandId);
        if(!isExists) {
            throw new IllegalStateException(
                    "Brand ID: " + brandId + "not found!"
            );
        }
        brandRepository.deleteById(brandId);
    }
}
