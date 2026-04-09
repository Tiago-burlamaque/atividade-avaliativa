import { Router } from "express";
import { esqueciSenha, registro } from "../controller/usuarioController.js";

const usuarioRouter = Router()

usuarioRouter.post('/registro', registro)
usuarioRouter.post('/esquecisenha', esqueciSenha)




export default usuarioRouter;