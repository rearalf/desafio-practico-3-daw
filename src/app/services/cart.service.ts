export class CartService {
  private storageKey = 'cart';

  getCart(): any[] {
    const cart = localStorage.getItem(this.storageKey);
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(product: any): void {
    const cart = this.getCart();
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  removeFromCart(productId: number): void {
    let cart = this.getCart();
    cart = cart.filter((item: any) => item.id !== productId);
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }

  clearCart(): void {
    localStorage.removeItem(this.storageKey);
  }

  updateQuantity(productId: number, quantity: number): void {
    const cart = this.getCart();
    const item = cart.find((item: any) => item.id === productId);
    if (item) {
      item.quantity = quantity;
      localStorage.setItem(this.storageKey, JSON.stringify(cart));
    }
  }
}
