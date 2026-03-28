import User from "../modelo/user.model.js"
import bcrypt from "bcryptjs"
import { createAccesToken } from "../libs/jwt.js";

//funciones para la peticion  POST
export const register = async (req, res) => { 
    const {run, password, nombreCompleto, sexo, direccion, comuna, provincia, region, tipoUsuario, correo, telefono} = req.body

    try {
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser= new User({
            run,
            password: passwordHash,
            nombreCompleto,
            sexo,
            direccion,
            comuna,
            provincia,
            region,
            tipoUsuario,
            correo, 
            telefono     
        });
        const userSaved = await newUser.save();
        const token = await createAccesToken({id: userSaved._id})
       
        res.cookie("token", token);       
        res.json({
            id: userSaved._id,
            run: userSaved.run,
            nombreCompleto: userSaved.username,
            sexo: userSaved.sexo,
            direccion: userSaved.direccion,
            comuna: userSaved.comuna,
            provincia: userSaved.provincia,
            region: userSaved.region,
            tipoUsuario: userSaved.tipoUsuario,
            correo: userSaved.correo,
            telefono: userSaved.telefono,
            createdAt: userSaved.createdAt,
        });      
    } catch (error) {
      res.status(500).json({message: error.message});
    }
};

export const login = async (req, res) => { 
    const {correo, password } = req.body;

    try {
        const userFound = await User.findOne({correo})
        if(!userFound) return res.status(400).json({ message: ">>> Usuario no encontrado."});

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: ">>> Contraseña incorrecta."});
        
        const token = await createAccesToken({id: userFound._id});
       
        res.cookie("token", token);       
        res.json({
            id: userFound._id,
            run: userFound.run,
            nombreCompleto: userFound.username,
            sexo: userFound.sexo,
            direccion: userFound.direccion,
            comuna: userFound.comuna,
            provincia: userFound.provincia,
            region: userFound.region,
            tipoUsuario: userFound.tipoUsuario,
            correo: userFound.correo,
            telefono: userFound.telefono,
            createdAt: userFound.createdAt,
        });
        console.log('>>> Login exitoso.')  
    } catch (error) {
      res.status(500).json({message: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

export const profile = async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: '>>> Error al obtener los usuarios.', error });
    }
}

export const getClientes = async (req, res) => {
    try {
        // Filtrar usuarios cuyo tipo sea 'cliente'
        const clientes = await User.find({ tipoUsuario: 'cliente' });
        if (clientes.length === 0) {
            return res.status(404).json({ message: 'No se encontraron clientes.' });
        }
        // Devolver todos los clientes
        return res.json(clientes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los clientes.', error });
    }
};

export const getFuncionarios = async (req, res) => {
    try {
        // Filtrar usuarios cuyo tipo sea 'funcionario'
        const funcionarios = await User.find({ tipoUsuario: 'funcionario' });
        if (funcionarios.length === 0) {
            return res.status(404).json({ message: 'No se encontraron funcionarios.' });
        }
        // Devolver todos los funcionarios
        return res.json(funcionarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los funcionarios.', error });
    }
};

export const updateUser = async (req,res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario actualizado exitosamente', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
}

export const deleteUser = async (req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
}

export const deleteLastUser = async (req, res) => {
    try {
        const lastUser = await User.findOne().sort({ createdAt: -1 });
        if (!lastUser) {
            return res.status(404).json({ message: 'No hay usuarios registrados' });
        }
        await User.findByIdAndDelete(lastUser._id);
        res.status(200).json({ message: 'Último usuario eliminado exitosamente', user: lastUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar al último usuario', error });
    }
};