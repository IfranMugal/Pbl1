import express from 'express';
const app = express();
import Admin from  './schema/adminSchema.js'
app.use(express.json());

app.post("/signup",async (req,res) => {
    const {name ,email ,password} = req.body;

    const already = await Admin.findOne({email : email})

    if(already){
        return res.json({
            msg : "Admin with this email already logged in"
        })
    }

    await Admin.create({
        name,
        email,
        password
    })

})

app.listen(3006);