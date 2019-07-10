import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './product.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, description: string, price: number) {
        const id = Math.random().toString();

        const newProduct = new Product(id, title, description, price);
        this.products.push(newProduct);
        return id;
    }

    getProducts() {
        return [...this.products];
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

    private findProduct(productId: string): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id === productId);
        const product = this.products[productIndex];

        if(!product) {
            throw new NotFoundException('Could not find product.');
        }

        return [product, productIndex];
    }
}