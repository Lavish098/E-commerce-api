const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProducts,
} = require("../controller/productController");

// router.get("/", getProducts);

// router.get("/:id", getProduct);

// router.post("/", addProduct);

// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProducts);

router.route("/").get(getProducts).post(addProduct)
router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProducts)
module.exports = router;
