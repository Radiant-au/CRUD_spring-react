package com.product.products.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.product.products.entity.Product;

public interface productRepository extends JpaRepository< Product, Long>{

}
