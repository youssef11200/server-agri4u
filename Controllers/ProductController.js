const ProductModel= require('../models/ProductModel')


module.exports = {
  getAllProducts: async (req, res,next) => {
    try {
      const products = await ProductModel.find({ id: req.params._id });
      res.status(200).json({
        success: true,
        products,
      });
    } catch (err) {
     return next(err);
    }
  },  
createProduct : async (req,res)=>{
  const coordinate = req.body.coordinate
  const productName = req.body.productName
  const productType = req.body.productType
  
  console.log(coordinate,productName, productType)
  try {
      await Product.create({
        coordinate : coordinate,
        productName : productName, 
        productType : productType,
      });
      res.json({
          "message": "Product Created"
      });
  } catch (err) {
      console.log(err);
  }
},
findProductById: async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    // const product = await Product.findOne({ _id: id });
    if (!product) {
      throw createError(404, 'Product does not exist.');
    }
    res.send(product);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid Product id'));
      return;
    }
    next(error);
  }
},

updateAProduct: async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };

    const result = await Product.findByIdAndUpdate(id, updates, options);
    if (!result) {
      throw createError(404, 'Product does not exist');
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      return next(createError(400, 'Invalid Product Id'));
    }

    next(error);
  }
},

deleteAProduct: async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Product.findByIdAndDelete(id);
    // console.log(result);
    if (!result) {
      throw createError(404, 'Product does not exist.');
    }
    res.send(result);
  } catch (error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError) {
      next(createError(400, 'Invalid Product id'));
      return;
    }
    next(error);
  }
}
}
exports.createproductions = (req, res) => {
  const { productName,isBio,quantity,ph, moisture, date, rating,user} = req.body;
  const newproduction= new Production({ productName,isBio,quantity,ph, moisture, date, rating,user } )
  res.json(newproduction)
};

