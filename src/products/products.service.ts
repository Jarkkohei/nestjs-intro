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
        return products.map((prod) => ({id: prod.id, title: prod.title, description: prod.description, price: prod.price}));
    }

    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);
        return { 
            id: product.id, 
            title: product.title, 
            description: product.description, 
            price: product.price
        };
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

    private async findProduct(productId: string): Promise<Product> {
        let product;
            
        try {
            product = await this.productModel.findById(productId);
        } catch(err) {
            throw new NotFoundException('Could not find product.');
        }

        if(!product) {
            throw new NotFoundException('Could not find product.');
        }

        return product;
    }
}