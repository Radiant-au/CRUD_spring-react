package com.product.products.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.product.products.dto.productDto;

public interface productService {

	productDto createProduct(productDto pdto);

	productDto getProductById(Long id);
	
	List<productDto> getAllProduct();
	
	productDto updateProduct(Long id , productDto pdto);
	
	void deleteProduct(Long id);
	
	String saveImage(MultipartFile imageFile) throws IOException;
	
	void deleteImage(String imgPath);
}
