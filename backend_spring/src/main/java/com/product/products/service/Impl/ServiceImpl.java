package com.product.products.service.Impl;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.product.products.dto.productDto;
import com.product.products.entity.Product;
import com.product.products.mapper.productMapper;
import com.product.products.repository.productRepository;
import com.product.products.service.productService;

@Service
public class ServiceImpl implements productService{
	
	private productRepository productrepo;

	public ServiceImpl(productRepository productrepo) {
		this.productrepo = productrepo;
	}
	
	@Override
	public productDto createProduct(productDto pdto) {
		Product product = productMapper.mapToproduct(pdto);
		Product savedProdut = productrepo.save(product);
		return productMapper.mapToproductDto(savedProdut);
	}

	@Override
	public productDto getProductById(Long id) {
		Product getProduct = productrepo.findById(id)
							.orElseThrow(()-> new IllegalStateException("There is no id"));
		return productMapper.mapToproductDto(getProduct);
	}

	@Override
	public List<productDto> getAllProduct() {
		return productrepo.findAll().stream().map((product) -> productMapper.mapToproductDto(product))
				.collect(Collectors.toList());
	}

	@Override
	public productDto updateProduct(Long id, productDto pdto) {
		Product product = productrepo.findById(id).orElseThrow( () -> new IllegalStateException("There is no id"));
		
		product.setCategory(pdto.getCategory());
		product.setDescription(pdto.getDescription());
		product.setName(pdto.getName());
		product.setPrice(pdto.getPrice());
		product.setImagePath(pdto.getImagePath());
		
		Product updated_product = productrepo.save(product);
		
		return productMapper.mapToproductDto(updated_product);
	}

	@Override
	public void deleteProduct(Long id) {
		Product product = productrepo.findById(id).orElseThrow(() -> new IllegalStateException("There is no id"));
		
		productrepo.delete(product);
	}

	@Override
	public String saveImage(MultipartFile imageFile) throws IOException{
		 String imageDirectory = "src/main/resources/static/images/"; // Save to the static directory
		 
		 	Path uploadPath = Paths.get(imageDirectory).toAbsolutePath();
		 	
		 	if (!Files.exists(uploadPath)) {
		        Files.createDirectories(uploadPath);
		    }
		 	
		    String uniqueFilename = UUID.randomUUID().toString().substring(0,8) + "_" + imageFile.getOriginalFilename();
		    Path filepath = uploadPath.resolve(uniqueFilename);
		    
		    try {
		    	Files.copy(imageFile.getInputStream(), filepath ,StandardCopyOption.REPLACE_EXISTING);
		    } catch (IOException e) {
		        throw new RuntimeException("Failed to save image", e);
		    }
		    System.out.println("Image saved to: " + filepath.toString());
		    return "/images/" + uniqueFilename; 
	}

	@Override
	public void deleteImage(String imgPath) {
		// TODO Auto-generated method stub
		if (imgPath != null && !imgPath.isEmpty()) {
	        Path path = Paths.get("src/main/resources/static" + imgPath);
	       
	        try {
	            Files.deleteIfExists(path);
	            System.out.println("successfully delete image");
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	    }
	}

}
