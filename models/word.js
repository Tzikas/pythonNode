const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
  name:String
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Word = mongoose.model('Word', wordSchema);
module.exports = Word;