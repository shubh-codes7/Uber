import { useEffect } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'

const Payment = ({ amount, onSuccess, rideId}) => {
  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    };
    loadRazorpay();
  }, []);

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/create-order`, {
        amount: amount
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "Uber Clone",
        description: "Payment for ride",
        order_id: data.id,
        handler: async (response) => {
          try {
            const verifyUrl = `${import.meta.env.VITE_BASE_URL}/payment/verify`;
            const { data } = await axios.post(verifyUrl, {
              ...response,
              rideId: rideId
            });
            toast.success("Payment successful!");
            onSuccess && onSuccess(data);
          } catch (error) {
            toast.error("Payment verification failed");
            console.log(error)
          }
        },
        prefill: {
          name:"User1",
          email: "user1@gmail.com",
          contact: "+91 75077 25127"
        },
        theme: {
          color: "#000000"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Payment Error:", error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-black text-white px-4 py-2 rounded-lg"
    >
      Pay ₹{amount}
    </button>
  );
};

export default Payment;