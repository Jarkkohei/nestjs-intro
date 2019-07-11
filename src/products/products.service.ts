import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>
    ) {}

    async insertProduct(title: string, description: string, price: number) {
        const newProduct = new this.productModel({title, description, price});
        const result = await newProduct.save();
        return result.id as string;
    }

    async getProducts() {
        //exec() forces to return a Promise
        const products = await this.productModel.find().exec();
        return products as Product[];
    }

    getSingleProduct(productId: string) {
        const product = this.findProduct(productId)[0];
        return {...product};
    }

    updateProduct(productId: string, title: string, description: string, price: number) {
        const [product, index] = this.findProduct(productId);
        const updatedProduct = { ...product };

        if (title) {
            updatedProduct.title = title;
        }

        if (description) {
            updatedProduct.description = description;
        }

        if (price) {
            updatedProduct.price = price;
        }

        this.products[index] = updatedProduct;
    }

    deleteProduct(productId: string) {
        const [_, index] = this.findProduct(productId);
        this.products.splice(index, 1);
    }

    private findProduct(productId: string): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id === productId);
        const product = this.products[productIndex];

        if(!product) {
            throw new NotFoundException('Could not find product.');
        }

        return [product, productIndex];
    }
}