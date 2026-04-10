import { Router } from "express";
import { esqueciSenha, login, registro } from "../controller/usuarioController.js";

const usuarioRouter = Router()

usuarioRouter.post('/registro', registro)
usuarioRouter.post('/esquecisenha', esqueciSenha)
usuarioRouter.post('/login', login)




export default usuarioRouter;