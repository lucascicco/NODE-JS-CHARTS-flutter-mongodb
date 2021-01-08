import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { Request, Response } from "express";
import { validationResult } from 'express-validator';
import { Password } from '../services/password';

class UserController {
  async store(req: Request , res:  Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);

      
      return res.status(400).json({
        error: 'Validação incorreta'
      })
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({
      email
    });

    if(existingUser){
      console.log(errors);

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
        email: user.email
      }, process.env.APP_SECRET! ,{
        expiresIn: process.env.EXPIRES_DATE!
      }
    );

    return res.status(200).send({
        user: {
          id:  user._id,
          email: user.email
        },
        token: userJwt
    });
  }

  async signIn(req: Request , res:  Response) {
    console.log(req.body);
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);

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
      },
      process.env.APP_SECRET!, {
        expiresIn: process.env.EXPIRES_DATE!
      }
    );

    res.status(200).send({
      user: {
        email: existingUser.email
      },
      token: userJwt
    });
  }  
};

export default new UserController();


