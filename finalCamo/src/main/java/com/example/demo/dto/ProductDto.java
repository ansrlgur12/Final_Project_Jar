package com.example.demo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductDto {
    private Long id;
    private String productName;
    private double price;
    private String brand;
    private String imageUrl;
    private String category3Name;
    private String category4Name;
}
