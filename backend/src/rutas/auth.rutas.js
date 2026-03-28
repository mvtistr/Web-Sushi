import {Router} from "express"
import {login, register, logout, profile, getClientes, getFuncionarios, deleteUser, deleteLastUser, updateUser } from "../controlador/auth.controller.js";
//import { authRequired } from "../validar/validateToken.js";

const router = Router()

router.post("/register", register);// Cuandos se realize una peticion post a register se ejecutara la funcion register 
router.post("/login", login);

router.post("/logout", logout);

//router.get("/profile", authRequired, profile);
router.get('/profile',profile)
router.get('/clientes',getClientes)
router.get('/funcionarios',getFuncionarios)

router.delete('/last', deleteLastUser);
router.delete('/user/:id',deleteUser)

router.put('/user/:id',updateUser)

export default router