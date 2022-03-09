import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import auth from "../config/auth";
import {Response, Request} from "express";
import {User} from "../entity/User";
import { getRepository } from 'typeorm';

export const login = async (request: Request, response: Response): Promise<Response> => {
	const{
		email,
		password
	} = request.body;
	const userRepository = getRepository(User);
	try{
		const user = await userRepository.findOneOrFail({ where: { email: email } });
		(user);
		const pass = await bcrypt.compare(password, user.password);
		if(!pass) throw new Error("Senha errada");
		return response.status(200).json({token: jsonwebtoken.sign({id: user.id}, auth.secret, {expiresIn: "7d"})});
	} catch (err){
		return response.status(500).json(err + "!");
	}
}