package com.cntt2.product.model;

import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "com/cntt2/product")
@Setter @Getter
public class Product {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "VARCHAR(255)")
    private int id;

    @Column(name="name")
    private String name;

    @Column(name="price")
    private BigDecimal price;

    @Column(name="brand")
    private String brand;

    @Column(name="category")
    private String category;

    @Column(name="thumbnail")
    private String thumbnail;
}
