import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Post()
    async addProduct(
        //@Body() completeBody: { title: string, description: string, price: string },
        @Body('title') productTitle: string,
        @Body('description') productDescription: string,
        @Body('price') productPrice: number,
    ) {
        const generatedId = await this.productsService.insertProduct(
            productTitle, 
            productDescription, 
            productPrice
        );

        return {id: generatedId};
    }

    @Get()
    async getAllProducts() {
        const products = await this.productsService.getProducts();
        return products;
    }

    @Get(':id')
    getProduct(
        @Param('id') productId: string
    ) {
        return this.productsService.getSingleProduct(productId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') productId: string,
        @Body('title') productTitle: string,
        @Body('description') productDescription: string,
        @Body('price') productPrice: number,
    ) {
        this.productsService.updateProduct(
            productId, 
            productTitle, 
            productDescription, 
            productPrice
        );

        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id') productId: string) {
        this.productsService.deleteProduct(productId);
        return null;
    }
}