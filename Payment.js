const mongoose = require("mongoose");

mongoose.model("Payment", {
  order_id: {
    type: String,
  },
  user_id: {
    type: String,
  },
  user_email: {
    type: String,
  },

  user_name: {
    type: String,
  },
  payment_type: {
    type: String,
  },

  payment_date: {
    type: String,
  },

  total: {
    type: String,
  },
});
