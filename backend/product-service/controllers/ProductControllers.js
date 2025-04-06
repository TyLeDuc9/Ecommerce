const Product=require('../models/ProductsModels');

exports.createProduct=async(req, res)=>{
    try{
        const { nameProduct, priceProduct, describe, imageProduct, status}=req.body;
        const newProduct=new Product({nameProduct, priceProduct, describe, imageProduct, status})
        await newProduct.save();
       
        res.status(201).json({
            message: 'Product created successfully',
            product:newProduct,
        });
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductById= async (req, res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:'Product not found'});
        }
        res.status(200).json(product);
    }catch(err){
        res.status(500).json({message:err.message})
    }
};

exports.updateProduct=async(req, res)=>{
    try{
        const {nameProduct, priceProduct, describe, imageProduct, status}=req.body;
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {nameProduct, priceProduct, describe, imageProduct, status},
            {new:true}
        );
        if(!product){
            return res.status(404).json({message:'Product not found'});
        }
        res.status(200).json({
            message:'Product update successfully',
            product,   
        });
    }catch(err){
        res.status(500).json({ message: err.message });

    }
}
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);  
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
