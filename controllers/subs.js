import User from "../models/user";

const Secret_Key = process.env.STRIPE_SECRET_KEY;

const stripe = require("stripe")(Secret_Key);
export const prices = async (req, res) => {
  const pricedetails = await stripe.prices.list();
  res.json(pricedetails.data);
};
export const createsubscription = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1KPpSXSCb4G9JP8ojU1imN7n",
          quantity: 1,
        },
      ],
      customer: "cus_L6HuGxMp7q1j8L",
      success_url: "http://localhost:8000/success",
      cancel_url: "http://localhost:8000/cancel",
    });
    res.json(session.url);
  } catch (error) {
    console.log(error);
  }
};
export const getsubscriptionstatus = async (req, res) => {
  try {
    const session = await stripe.subscriptions.list({
      customer: "cus_L6HuGxMp7q1j8L",
      status: "all",
      expand: ["data.default_payment_method"],
    });

    const updated = await User.findByIdAndUpdate(
      "61ff7b22d06337c4f0c048e9",
      { subscriptions: session.data },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.log(error);
  }
};
export const subscriptions = async (req, res) => {
  try {
    const session = await stripe.subscriptions.list({
      customer: "cus_L6HuGxMp7q1j8L",
      status: "all",
      expand: ["data.default_payment_method"],
    });
    res.json(session);
  } catch (error) {
    console.log(error);
  }
};
