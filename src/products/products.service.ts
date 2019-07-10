import { Injectable } from "@nestjs/common";
import { Product } from './product.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, description: string, price: number) {
        const id = new Date().toString();

        const newProduct = new Product(id, title, description, price);
        this.products.push(newProduct);
        return id;
    }
}