const express = require("express");
const app = express();

const { initializeDatabase } = require("./db/db.connect");

const cors = require("cors");
app.use(express.json());

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

initializeDatabase();

const Product = require("./models/product.model");

const newProduct = new Product({
  name: "Ring & Stripes Metal Wall Clock",
  type: "Decor",
  description:
    "A Ring & Stripes Metal Wall Clock is Perfect for your Home & Office Décor, It can be used for gifting also. Dimension: 24 x 24 x 1 Inch (L x W x H)",
  coverImg:
    "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/3/d33bb55H-WD61_1.jpg?rnd=20200526195200&tr=w-1080",
  additionalImages: [
    "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/3/d33bb55H-WD61_6.jpg?rnd=20200526195200&tr=w-1080",
    "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/3/d33bb55H-WD61_5.jpg?rnd=20200526195200&tr=w-1080",
    "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/3/d33bb55H-WD61_4.jpg?rnd=20200526195200&tr=w-1080",
  ],
});

async function createProduct(newProduct) {
  try {
    const product = new Product(newProduct);
    return await product.save();
  } catch (error) {
    throw error;
  }
}

// createProduct(newProduct);

app.get("/", (req, res) => {
  res.send("Welcome!!");
});

async function getProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw error;
  }
}
app.get("/v1/products", async (req, res) => {
  try {
    const products = await getProducts();
    if (products.length != 0) {
      res.json(products);
    } else {
      res.status(400).json({ error: "Products not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products." });
  }
});
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
