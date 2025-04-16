import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://mugalirfan506:z4VG8rzBe9XrW9zl@cluster0.dzxhukg.mongodb.net/pbl")

const adminSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
    },
    password :{
        type : String,
        required : true,
    }
})

const Admin = new mongoose.model('Admin',adminSchema)
export default Admin;