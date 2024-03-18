import mongoose, {mongo} from "mongoose";

const UserSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, required: true },
    matricula: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    endereco: { type: String, required: true },
    turno: { type: String, required: true },
    filial: { type: String, required: true },
    linha: { type: String, required: true },
    ponto_de_referencia: { type: String, required: true },
    senha:{ type: String, required: true }
  }, { versionKey: false });
  
  UserSchema.set('toJSON', {
    transform: function (doc, ret, options) {
      // Remove o campo de senha do resultado
      delete ret.senha;
      return ret;
    }
  });
  
const userModel = mongoose.model("usuarios", UserSchema)

export default userModel