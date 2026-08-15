import mongoose from "mongoose";

 const settingSchema= new mongoose.Schema({
    title: {
        type: String,

    },
    logo: {
        type: String
    },
    description: {
        type: String
    }
    
})

const Setting= mongoose.model('Setting', settingSchema)
export default Setting