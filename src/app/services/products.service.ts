import axios from 'axios';

export class ProductsService {
  async getProducts() {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  }
}
