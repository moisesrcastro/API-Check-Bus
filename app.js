import express from "express";
import 'dotenv/config';
import userRoutes from "./Routes/UserRoutes.js";
import ConectaNaDatabase from './Connection/connection.js'


const conexao = await ConectaNaDatabase();

conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("Conexao com o banco feita com sucesso");
})

const app = express();


app.use(
    express.json(),
    userRoutes

);

app.listen(process.env.PORT, () => {

    console.log("Servidor está ouvindo")

})