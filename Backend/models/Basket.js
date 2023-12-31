const mongoose = require(`mongoose`);


const basketSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },

    products: [{
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: Number,
      }],

    });

const Basket = mongoose.model('Basket', basketSchema);

module.exports = Basket;