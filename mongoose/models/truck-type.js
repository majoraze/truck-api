const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const TruckTypeSchema = new mongoose.Schema({
  cod: { type: String, required: true },
  name: { type: String, required: true }
});

TruckTypeSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('TruckType', TruckTypeSchema);
