import server from "./server";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const start = async () => {
    dotenv.config();

    try{
      await mongoose.connect(process.env.MONGODB!, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true
      });
      console.log('connected to mongodb');
    }catch(e){
      console.error(e);
    }
  
    server.listen(3000, () => {
      console.log('Listening on port 3000!');
    });
};

start();