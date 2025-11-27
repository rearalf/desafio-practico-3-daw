//Clave para guardar y recuperar el carrito
export class CartService {
  private storageKey = 'cart';

  //obtine el carrito
  getCart(): any[] {
    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) : [];
  }

  //agrega los productos al carrito
  addToCart(product: any): void {
    const cart = this.getCart();
    const existing = cart.find((item: any) => item.id === product.id); //busca si existe el producto en el carrito
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1; //aumenta la cantidad 
    } else {
      cart.push({ ...product, quantity: 1 }); //lo agrega al carrito
    }
    localStorage.setItem(this.storageKey, JSON.stringify(cart)); //guarda el carrito
  }
  
  //elimina del carrito el producto por ID
  removeFromCart(productId: number): void {
    let cart = this.getCart();
    cart = cart.filter((item: any) => item.id !== productId);
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  clearCart(): void {
    localStorage.removeItem(this.storageKey);
  }
  
  //actualiza la cantidad de un producto
  updateQuantity(productId: number, quantity: number): void {
    const cart = this.getCart();
    const item = cart.find((item: any) => item.id === productId);
    if (item) {
      item.quantity = quantity;
      localStorage.setItem(this.storageKey, JSON.stringify(cart));
    }
  }

    // Elimina una cantidad específica de un producto y lo elimina si la cantidad llega a cero
    removeProductQuantity(productId: number, quantity: number): void {
      const cart = this.getCart();
      const itemIndex = cart.findIndex((item: any) => item.id === productId);
      if (itemIndex !== -1) {
        cart[itemIndex].quantity -= quantity;
        if (cart[itemIndex].quantity <= 0) {
          cart.splice(itemIndex, 1); // Elimina el producto del carrito
        }
        localStorage.setItem(this.storageKey, JSON.stringify(cart));
      }
    }
}
