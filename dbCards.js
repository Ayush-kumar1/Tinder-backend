import mongoose from 'mongoose';

const cardSchema = mongoose.Schema({
    name: String,
    image: String
})

export default mongoose.model('Cards', cardSchema)