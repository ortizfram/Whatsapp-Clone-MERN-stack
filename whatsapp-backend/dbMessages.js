import mongoose from 'mongoose';

// defining Data Schemma
//      data structure
cont whatsappSchema=mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received : String
})

// give name to collection
export default mongoose.model('messageContent', whatsappSchema)