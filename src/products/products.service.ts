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

    async updateProduct(productId: string, title: string, description: string, price: number) {
        const updatedProduct = await this.findProduct(productId);

        if (title) {
            updatedProduct.title = title;
        }

        if (description) {
            updatedProduct.description = description;
        }

        if (price) {
            updatedProduct.price = price;
        }

        updatedProduct.save();
    }

    async deleteProduct(productId: string) {
        //exec() forces to return a Promise
        //_id is used because the MongoDB uses it for id.
        const result = await this.productModel.deleteOne({_id: productId}).exec();
        if(result.n === 0) {
            throw new NotFoundException('Could not find product.');
        }
    }

    private async findProduct(productId: string): Promise<Product> {
        let product;
            
        try {
            //exec() forces to return a Promise
            product = await this.productModel.findById(productId).exec();
        } catch(err) {
            throw new NotFoundException('Could not find product.');
        }

        if(!product) {
            throw new NotFoundException('Could not find product.');
        }

        return product;
    }
}