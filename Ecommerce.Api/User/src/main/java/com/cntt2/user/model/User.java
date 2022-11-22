package com.cntt2.user.model;

import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
@Setter @Getter
public class User {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "VARCHAR(255)")
    private String id;

    @Column(name="isActive")
    private boolean isActive;

    @NotNull
    @Column(name="username", unique = true)
    private String username;

    @NotNull
    @Column(name="password")
    private String password;

    @Column(name="fullname")
    private String fullname;

    @Column(name="email")
    private String email;

    @Column(name="phone")
    private Long phone;

    @Column(name="avatar")
    private String avatar;

    @CreationTimestamp
    @Column(name="createdDate", nullable = false, updatable = false)
    private Date createdDate;

    @UpdateTimestamp
    @Column(name="updatedDate", nullable = false, updatable = true)
    private Date updatedDate;
}
