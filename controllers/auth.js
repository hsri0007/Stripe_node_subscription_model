import User from "../models/user";
const Secret_Key = process.env.STRIPE_SECRET_KEY;

const stripe = require("stripe")(Secret_Key);

export const register = async (req, res) => {
  const email = req.body.email;
  const emailexist = await User.findOne({ email });

  if (emailexist) {
    return res.json({
      error: "Email is taken",
    });
  }

  const customer = await stripe.customers.create({ email });

  console.log(customer, "customer");

  try {
    const userdata = await new User({
      email,
      stripe_customer_id: customer.id,
    }).save();

    return res.json({
      userdata,
    });
  } catch (error) {
    res.json({ error });
  }
};
