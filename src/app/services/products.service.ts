import axios from 'axios';

//obtiene los productos de la API
export class ProductsService {
  async getProducts(category?: string) {
    const uri =
      category && category !== 'undefined'
        ? `https://fakestoreapi.com/products/category/${category}`
        : 'https://fakestoreapi.com/products';

    const response = await axios.get(uri);
    return response.data;
  }
}
