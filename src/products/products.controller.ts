import { Controller, Post, Body } from '@nestjs/common';
import { ProductsService } from 'dist/products/products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Post()
    addProduct(
        //@Body() completeBody: { title: string, description: string, price: string },
        @Body('title') productTitle: string,
        @Body('description') productDescription: string,
        @Body('price') productPrice: number,
    ) {
        const generatedId = this.productsService.insertProduct(productTitle, productDescription, productPrice);
        return {id: generatedId};
    }
}