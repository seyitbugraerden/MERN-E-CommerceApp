const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  sk_test_51OqsIqA7JPoKCIXJbq5SI5jgSvpoGjLnLZtosLuI3sCJSmPFLQF0wXn2yk0ArQi8TElhowby4IR1iaPyzDQq2CAH00Cr2qHSDg
);

router.post("/", async (req, res) => {
  const { products, user, cargoFree } = req.body;
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: { name: product.name },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));
  // try {
  //   const session = await stripe.checkout.sessions.create({
  //     payment_method_types: ["card"],
  //     line_items: lineItems,
  //     mode: "payment",
  //     success_url: `http://localhost:3000/api/success`
  //   });
  //   res.status(200).json({ id: session.id });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ error: "Internal server error" });
  // }
});

module.exports = router;
