import express from "express";
import UserController from "../Controllers/UserControler.js"
const userRoutes = express.Router()

userRoutes.post("/cadastro", UserController.cadastro)
          .post("/login", UserController.login)
          .put("/alterarSenha/:matricula", UserController.alterarSenha)
          .put("/alterarCadastro/:matricula", UserController.atualizarCadastro)
          .delete("/removerCadastro/:matricula", UserController.apagarCadastro)

export default userRoutes