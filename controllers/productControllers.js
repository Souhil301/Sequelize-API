const db = require('../models');


const createProduct = async (req, res) => {
    if (!req.body.name || !req.body.price || !req.body.description || !req.body.UserId) {
        return res.status(400).json({ error: 'name, price and description are required!' });
    }
    try {
        const existProuct = await db.Product.findOne({ where:  {name: req.body.name} });
        if (existProuct) {
            return res.status(409).json({ error: 'Product already exists!' });
        }
        const product = await db.Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message || 'Registration failed' });
    }
};



const getAllProducts = async (req, res) => {
    try {
        const products = await db.Product.findAll();
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ error: err.message || 'Failed to retrieve users' });
    }
};



const updateProduct = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ error: 'User ID is required!' });
    try {
        const [updated] = await db.Product.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message || 'Update failed' });
    }
};


const deleteProduct = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ error: 'Product ID is required!' });
    try {
        const deleted = await db.Product.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message || 'Delete failed' });
    }
};



module.exports = 
{
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}