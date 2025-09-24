export interface Product {
    name: string;
    price: number;
    currency: string;
    categories: string[];
    measurements: {
        height: number;
        width: number;
        weight: number;
    };
}