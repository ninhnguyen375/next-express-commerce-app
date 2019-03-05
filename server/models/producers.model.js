const mongoose = require('mongoose');

const producerSchema = new mongoose.Schema({
  producer_name: String,
  producer_id: String,
});
const Producers = mongoose.model('Producers', producerSchema, 'Producers');
module.exports = Producers;
