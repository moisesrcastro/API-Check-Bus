import bcryptjs from "bcryptjs";
import userModel from "../Models/User.js";
import jsonwebtoken from "jsonwebtoken";
import 'dotenv/config';


class UserController{

    static async login(request, response){

        
        const usuario = await userModel.findOne({
                matricula:request.body.matricula
            })


        if (!usuario) {
            response.status(400).json({"message": "usuário não cadastrado"});
        }else {
            
            const senhasIguais =  await bcryptjs.compare(request.body.senha, usuario.senha)

            if(!senhasIguais) {
                response.status(400).json({"message": "senha incorreta"});
            }else {
                const hashProject = await bcryptjs.hash(process.env.PROJECT_NAME, 8)
                const tokenAcess = jsonwebtoken.sign({
                    matricula: usuario.matricula
                }, hashProject, 
                {expiresIn:8640})

                response.status(200).json({"dados":{
                    "token": tokenAcess
                }})
            }
            }

    }

    static async cadastro(request, response){

        const usuario = await userModel.findOne({
                matricula:request.body.matricula
            });

        if (usuario){
            response.status(400).json({"message": "usuario já cadastrado"})
        }else{
            try {
    
                const senhaHash = await bcryptjs.hash(request.body.senha, 8)
    
                const novoUsuario = await userModel.create(
                    {
                        "nome": request.body.nome,
                          "matricula": request.body.matricula,
                          "email": request.body.email,
                          "telefone": request.body.telefone,
                          "endereco": request.body.endereco,
                          "turno": request.body.turno,
                          "filial": request.body.filial,
                          "linha": request.body.linha,
                          "ponto_de_referencia": request.body.ponto_de_referencia,
                          "senha": senhaHash
                      }
                );
    
                response.status(201).json({ message: "criado com sucesso", usuario: novoUsuario });
                
              } catch (erro) {
                response.status(500).json({ message: `${erro.message} - falha ao cadastrar novo usuário` });
              }
            
        }

    }

    static async enviarToken(request, response){}

    static async resetarSenha(request, response){}

    static async alterarSenha(request, response){

        const usuario = await userModel.findOne({matricula: request.params.matricula})

        const senhasIguais = await bcryptjs.compare(request.body.senha_antiga, usuario.senha)

        if (!senhasIguais){

            response.status(400).json({'message': 'Senha informada não corresponde a cadastrada'})

        }else{

            try{
    
                const novaSenha = await bcryptjs.hash(request.body.nova_senha, 8)
                
                const senhaAtualizada = await userModel.findOneAndUpdate({matricula: request.params.matricula}, {senha: novaSenha}, {new: true})
                
                response.status(201).json({"message": "Senha Atualizada!", "dados":senhaAtualizada})
            
            }catch (erro){
    
                response.status(500).json({"message": `${erro.message}`})
    
            }
        }


    }

    static async atualizarCadastro(request, response){

        //turno, filial endereço
        const usuario = await userModel.findOne({matricula: request.params.matricula})

        if (!usuario){

            response.status(400).json({"message":"Usuário não cadastrado"})

        }else {

            try{
    
                const cadastroAtualizado = await userModel.findOneAndUpdate({
                    matricula: request.params.matricula
                },
                {
                    turno:request.body.turno,
                    filial:request.body.filial,
                    endereco:request.body.endereco,
                },
                {
                    new: true
                })
    
    
    
                response.status(201).json({"message": "Cadastro Atualizado", "dados": cadastroAtualizado})
            }catch(erro){
            response.status(400).json({"message":erro.message})
    
        }
        }


}

    static async apagarCadastro(request, response){

        const usuario = await userModel.findOne({matricula: request.params.matricula})

        if (!usuario){

            response.status(400).json({"message":"Usuário não cadastrado"})

        }else{
            const usuarioDeletado = await userModel.findOneAndDelete({matricula:request.params.matricula})
            response.status(200).json({"message":"Cadastro Deletado", "dados": usuarioDeletado})
        }
    }
}
 
export default UserController