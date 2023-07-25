const express = require("express");
const asyncHandler = require("express-async-handler");
const Production = require("../models/ProductionModels");
const protect =require('../Middleware/ProfileMiddleware');
const Multer = require("../Middleware/Multer");
// const { validate, postValidator } = require("../Middleware/postValidator");
const productionRoute = express.Router();

// GET ALL PRODUCTION
productionRoute.get( "/",
  asyncHandler(async (req, res) => {
    const productions = await Production.find({});
    res.json(productions);
  })
);


 // GET PRODUCTION BY ID

productionRoute.get( "/:id",
    asyncHandler(async (req, res) => {
      const production = await Production.findById(req.params.id);
      if(production){
        res.json(production);
      }
     
      else{
        res.status(404)
        throw new Error('production not found')
      }
    })
  );

  // DELETE PRODUCT

  productionRoute.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const production = await Production.findById(req.params.id);
   
    if (production) {
      await production.remove();
      res.json({ message: "Product deleted" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);
//DELETE ALL 
productionRoute.delete(
  "/remove",
  protect,
  asyncHandler(async (req, res) => {
    const userProductions = await Production.find({ user: req.user._id });

    if (userProductions.length > 0) {
      await Production.deleteMany({ user: req.user._id });
      res.json({ message: "All productions deleted" });
    } else {
      res.status(404);
      throw new Error("No productions found for the user");
    }
  })
);

productionRoute.post(
  "/addproduction",
  protect,
  asyncHandler(async (req, res) => {
    const { name, description,reviews,rating,numReviews ,quantity   } = req.body;
    const productionExist = await Production.findOne({  name, description,reviews,rating,numReviews , quantity });
    if (productionExist) {
      res.status(400);
      throw new Error("Product name already exist");
    } else {
      const production = new Production({
        name,
        description,
        rating,
        quantity,
        reviews,
        numReviews,
        user: req.user._id,
      });
      if (production) {
        const createdproduction = await production.save();
        res.status(201).json(createdproduction);
      } else {
        res.status(404);
        throw new Error("Product not found");
      }
    }
  })
);


// EDIT PRODUCTION

productionRoute.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const { name, description, image,quantity} = req.body;
    const production = await Production.findById(req.params.id);
    if (product) {
     production.name = name || production.name;
     production.quantity = quantity ||production.quantity;
     production.description = description ||production.description;
     production.image = image ||production.image;
      const updateProduction = await production.save();
      res.json(updateProduction);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);


productionRoute.post(
  "/create",
  protect,Multer.single("file"),
  asyncHandler(async (req, res) => {
    const { name, description ,reviews,numReviews,quantity} = req.body;

    const production = await Production.create({
      name,
      description,
      quantity,
      reviews,
      numReviews,
      user: req.user._id // Assign the current user ID to the 'user' field
    });
    res.json(production)
    // if (production) {
    //   const createdproduction = await production.save();
    //   res.status(201).json(createdproduction);
    // } else {
    //   res.status(404);
    //   throw new Error("Product not found");
    // }
  })
);

// ADD PRODUCTION

// productionRoute.post(
//   "/addProductimage",
//   protect,
//   upload("products").single("file"),
//   asyncHandler(async (req, res) => {
//     const url = `${req.protocol}://${req.get("host")}`;
//     console.log(req.file);
//     const { file } = req;
//     try {
//       const newproduction = await new Productions({
//         ...req.body,
//         user: req.user._id,
//       });
//       newproduction.image = `${url}/${file.path}`;
//       await newproduction.save();
//       res.send({ newproduction, msg: "product succefully added" });
//     } catch (error) {
//       res.status(400).send(error.message);
//     }
//   }
  
// ));
  


  // PRODUCTION REVIEW


  productionRoute.post(
    "/:id/review",
    protect,
    asyncHandler(async (req, res) => {
      const { rating, comment } = req.body;
      const production = await Production.findById(req.params.id);
      if (production) {
        console.log(production);
        const alreadyReviewed = production.review.find(
          (r) => r.user._id.toString() === req.user._id.toString()
        );
        if (alreadyReviewed != undefined) {
          res.status(400);
          throw new Error("Product already reviewed");
        }
        const review = {
          name: req.user.name,
          rating: Number(rating),
          comment,
          user: req.user._id,
        };
        production.review.push(review);
        production.numReviews = production.review.length;
        production.rating= production.review.reduce((acc,item)=>item.rating=acc,0)/production.review.length
        await production.save();
        res.status(201).json({ message: "reviewed added" });
      } else {
        res.status(404);
        throw new Error("Product not found");
      }
    })
  );



module.exports = productionRoute;
