export class Product {
  constructor(
    public readonly id: number,
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public imageUrl: string | null,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  updateStock(quantity: number): void {
    if (quantity < 0) {
      throw new Error('Stock cannot be negative');
    }

    this.stock = quantity;
  }
}
