const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
    memory:String,
    retentions:[],
    retention: {type: Number ,default: 0 },
    originalId: String
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Word = mongoose.model('Word', wordSchema);
module.exports = Word;