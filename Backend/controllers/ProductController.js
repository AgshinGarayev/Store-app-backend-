const productModel =  require('../models/Product')
const mongoose = require('mongoose')


const postProduct = async (req, res) => {
    const { author, quote } = req.body;

    let emptyFields = [];

    if (!author) {
        emptyFields.push('author');
    }
    if (!quote) {
        emptyFields.push('quote');
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }

    // add doc to db
    try {
        const user_id = req.user._id;
        const createdQuote = await productModel.create({ author, quote, user_id });
        res.status(200).json(createdQuote);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid quote ID' });
      }
  
      const quote = await productModel.findOneAndDelete({ _id: id });
  
      if (!quote) {
        return res.status(404).json({ error: 'Quote not found' });
      }
  
      res.status(200).json(quote);
    } catch (error) {
      console.error('Error deleting quote:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  


// const getQuote = async (req,res) =>{
//     quoteModel.find({}).then(function(quotes){
//         res.json(quotes)
//     }).catch(function(err){
//         res.json(err)
//     })
// }


const getProduct = async (req,res)=>{
    const quotes = await productModel.find({}).sort({ _id: -1 });
    res.status(200).json(quotes)
}

const getproductId = async (req,res) =>{
    const quoteId = req.params.id;

    productModel.findById(quoteId, (err, quote) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (!quote) {
            res.status(404).json({ error: 'Quote not found' });
        } else {
            res.json(quote);
        }
    });
}



const getUserProducts = async (req, res) => {
    const user_id = req.user._id
  
    const quotes = await productModel.find({user_id}).sort({createdAt: -1})
  
    res.status(200).json(quotes)
    
};





const updateProduct = async (req,res) =>{
    const quoteId = req.params.id;
    const updatedData = req.body;

    productModel.findByIdAndUpdate(quoteId, updatedData, { new: true }, (err, updatedQuote) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (!updatedQuote) {
            res.status(404).json({ error: 'Quote not found' });
        } else {
            res.json(updatedQuote);
        }
    });
}

module.exports= {
postProduct, 
deleteProduct,
getProduct,
getproductId,
getUserProducts,
updateProduct

}