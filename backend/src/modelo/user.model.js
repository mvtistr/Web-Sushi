import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    run: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,       
    },
    nombreCompleto: {
        type: String,
        required: true,
        trim: true,
    },
    sexo: {
        type: String,
        enum: ['masculino', 'femenino', 'otro'],
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    comuna: {
        type: String,
        required: true,
    },
    provincia: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    }, 
    tipoUsuario: {
        type: String,
        enum: ['cliente', 'funcionario'],
        required: true,
    },   
    correo: {
        type: String,
        required: true,
        unique: true,
       
    },
    telefono: {
        type: String,
        required: true,
    }, 
},{
    timestamps: true
}); 

export default mongoose.model("User", userSchema);