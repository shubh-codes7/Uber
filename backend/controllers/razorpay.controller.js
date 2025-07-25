import { razorpay } from '../app.js';
import crypto from 'crypto';
import {sendMessageToSocketId} from '../socket.js'
import rideModel from '../models/ride.model.js';

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const options = {
      amount: amount * 100, // amount in smallest currency unit
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);
    console.log(order);

    if (!order) {
      throw new Error("Could not create order");
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, rideId } = req.body;
    
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {

      const ride = await rideModel.findById(rideId).populate('captain');
      // console.log(ride)

      if (!ride || !ride.captain?.socketId) {
        throw new Error('Ride or captain socket not found');
      }

      sendMessageToSocketId(ride.captain.socketId, {
        event: 'payment-completed',
        data: {
          rideId: ride._id,
          paymentId: razorpay_payment_id
        }
      })

      res.status(200).json({ message: "Payment verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error verifying payment", error: error.message });
  }
};