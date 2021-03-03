import products from 'test/stubs/products.json';

export function index(req, res) {
  res.status(200).json({ products });
}
