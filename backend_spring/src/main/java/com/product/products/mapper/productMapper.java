package com.product.products.mapper;

import com.product.products.dto.productDto;
import com.product.products.entity.Product;

public class productMapper {
	
	public static productDto mapToproductDto(Product product) {
		return new productDto(
				product.getId(),
				product.getName(),
				product.getPrice(),
				product.getCategory(),
				product.getDescription(),
				product.getImagePath()
		);	
				
	}
	
	public static Product mapToproduct(productDto pdto) {
		return new Product(
				pdto.getId(),
				pdto.getName(),
				pdto.getPrice(),
				pdto.getCategory(),
				pdto.getDescription(),
				pdto.getImagePath()
			);
	}
}
