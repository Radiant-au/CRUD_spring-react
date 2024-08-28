package com.product.products.controller;



import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.product.products.dto.productDto;
import com.product.products.service.productService;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/products")
public class ProductController {
	private productService Pservice;

	public ProductController(productService pservice) {
		Pservice = pservice;
	}
	
	@PostMapping
	public ResponseEntity<productDto> createProduct(@RequestPart("product") String productJson , @RequestPart("image") MultipartFile imageFile) throws IOException{
		ObjectMapper objmapper = new ObjectMapper();
		productDto pdto = objmapper.readValue(productJson, productDto.class);
		
		String imagePath = Pservice.saveImage(imageFile);
		pdto.setImagePath(imagePath);
		productDto savedProduct = Pservice.createProduct(pdto);
		
		return new ResponseEntity<>(savedProduct, HttpStatus.OK);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<productDto> getbyId(@PathVariable Long id){
		productDto getProduct = Pservice.getProductById(id);
		return  ResponseEntity.ok(getProduct);
	}
	
	@GetMapping
	public ResponseEntity<List<productDto>> getAll(){
		List<productDto> getAllProduct = Pservice.getAllProduct();
		return ResponseEntity.ok(getAllProduct);
		
	}
	
	@PutMapping("{id}")
	public ResponseEntity<productDto> updateProduct(@PathVariable Long id ,@RequestPart("product") String productJson , @RequestPart(value = "image", required = false) MultipartFile imageFile) throws IOException{
		ObjectMapper objmapper = new ObjectMapper();
		productDto pdto = objmapper.readValue(productJson, productDto.class);
		productDto existingProduct = Pservice.getProductById(id);
		
		 if (imageFile != null && !imageFile.isEmpty()) {
			 	
			 	String existingPath = existingProduct.getImagePath();
			 	
			 	if(existingPath != null) {
			 		 // Delete the existing image file
				 	Pservice.deleteImage(existingPath);
			 	}
		       
			 	String imagePath = Pservice.saveImage(imageFile);
				pdto.setImagePath(imagePath);
		 }else {
		        // If no new image, retain the existing image path
		        pdto.setImagePath(existingProduct.getImagePath());
		    }
		
		productDto updated_product = Pservice.updateProduct(id, pdto);
		return ResponseEntity.ok(updated_product);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<String> deleteProduct(@PathVariable("id") Long id){
		 productDto existingProduct = Pservice.getProductById(id);	
		 String existingImagePath = existingProduct.getImagePath();
		Pservice.deleteImage(existingImagePath);
		Pservice.deleteProduct(id);
		return ResponseEntity.ok("Successfully deleted product");
	}
	
}
