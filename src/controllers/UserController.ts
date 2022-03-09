import {User} from "../entity/User";
import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { Response, Request } from 'express';
import bcrypt from 'bcrypt';

export const store = async (request: Request, response: Response): Promise<Response> => {
	try{
		const userRepository = await getRepository(User);
		const user = await userRepository.create(request.body);

		const errors = await validate(user);
		if (errors.length > 0) {
			return response.status(500).json(errors);
		}

		await userRepository.save(user);
		return response.status(201).json(user);
	} catch(err){
		return response.status(500).json({erros: err + "!"});
	}

}

export const show = async (request: Request, response: Response): Promise<Response> => {
	const {id} = request.params;
	try {
		const userRepository = await getRepository(User);
		const user = await userRepository.findOne(id);
		return response.status(200).json(user);
	} catch (err) {
		return response.status(500).json({erros: err + "!"});
	}
}

export const update = async (request: Request, response: Response): Promise<Response> => {
	const {id} = request.params;
	try{
		const userRepository = await getRepository(User);
		const user = await userRepository.create(request.body);

		const errors = await validate(user);
		if (errors.length > 0) {
			return response.status(500).json(errors);
		}

		if(request.body.password)
			request.body.password = await bcrypt.hash(request.body.password, 12);	

		await userRepository.update(id, request.body);
		const userDB = await userRepository.findOne(id);
		return response.status(201).json(userDB);
	} catch(err){
		return response.status(500).json({erros: err + "!"});
	}
}


export const index = async (request: Request, response: Response): Promise<Response> => {
	try {
		const userRepository = await getRepository(User);
		const users = await userRepository.find();
		return response.status(200).json(users);
	} catch (err) {
		return response.status(500).json({erros: err + "!"});
	}
}

export const deleteUser = async (request: Request, response: Response): Promise<Response> => {
    const {id} = request.params;
	try{
		const userRepository = await getRepository(User);
		const user = await userRepository.findOne(id);
    	await userRepository.remove(user);
		return response.json({message: "User removido"})
	} catch (err){
		return response.status(500).json({erros: err + "!"});
	}
}