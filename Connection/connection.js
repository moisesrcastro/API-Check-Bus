import 'dotenv/config';
import mongoose, {mongo} from "mongoose";

async function ConectaNaDatabase(){

    mongoose.connect(process.env.STRING_CONNECTION);

    return mongoose.connection
}

export default ConectaNaDatabase