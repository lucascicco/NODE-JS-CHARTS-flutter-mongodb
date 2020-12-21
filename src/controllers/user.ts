import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { Request, Response } from "express";
import { validationResult } from 'express-validator';
import { Password } from '../services/password';

class UserController {
  async store(req: Request , res:  Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validação incorreta'
      })
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({
      email
    });

    if(existingUser){
      return res.status(400).json({
        error: 'Usuário já existente'
      })
    }

    const user = User.build({
      email, password
    });

    await user.save();

    // Generate  JWT + store it on session object 
    const userJwt = jwt.sign(
      {
        id: user._id,
      }, process.env.APP_SECRET!
    );

    return res.status(200).send({
        user,
        token: userJwt
    });
  }

  async signIn(req: Request , res:  Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validação incorreta'
      })
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        error: 'Conta inexistente'
      })
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    
    if (!passwordsMatch) {
      return res.status(400).json({
        error: 'Senha incorreta'
      })
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email
      },
      process.env.APP_SECRET!
    );

    res.status(200).send({
      user: existingUser,
      password: userJwt
    });
  }  
};


export default new UserController();


