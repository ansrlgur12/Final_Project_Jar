package com.example.demo.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class FavoriteDto {
    private Long favoriteItemId;
    private String productName;
    private double price;
    private String imageUrl;
    public FavoriteDto(Long favoriteItemId, String productName, double price, String imageUrl) {
        this.favoriteItemId = favoriteItemId;
        this.productName = productName;
        this.price = price;
        this.imageUrl = imageUrl;
    }
}