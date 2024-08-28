package com.product.products.dto;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class productDto {
	private Long id;
	private String name;
	private double price;
	private String category;
	private String description;
	private String imagePath;

	
}
