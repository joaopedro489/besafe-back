import {Product} from "../entity/Product";
import { getRepository } from 'typeorm';
import { Response, Request } from 'express';
import {User} from "../entity/User";

export const storeProduct = async (request: Request, response: Response): Promise<Response> => {
	try{
		const productRepository = await getRepository(Product);
		const product = await productRepository.create(request.body);

		const user = await getRepository(User).findOne(request.id);
		product.user = user;

		await productRepository.save(product);
		return response.status(201).json(product);
	} catch(err){
		return response.status(500).json({erros: err + "!"});
	}
}

export const updateProduct = async (request: Request, response: Response): Promise<Response> => {
	const {id} = request.params;
	try{
		const productRepository = await getRepository(Product);

		await productRepository.update(id, request.body);
		const product = await productRepository.findOne(id);
		return response.status(200).json(product);
	} catch(err){
		return response.status(500).json({erros: err + "!"});
	}
}

export const showProduct = async (request: Request, response: Response): Promise<Response> => {
	const {id} = request.params;
	try{
		const productRepository = await getRepository(Product);
		const product = await productRepository.findOneOrFail(id);
		return response.status(200).json(product);
	} catch(err){
		return response.status(500).json({erros: err + "!"});
	}
}

export const deleteProduct = async (request: Request, response: Response): Promise<Response> => {
	const {id} = request.params
	try{
		const productRepository = await getRepository(Product);
		const product = await productRepository.findOneOrFail(id);
    	await productRepository.remove(product);
		return response.json({message: "Produto removido"})
	} catch (err){
		return response.status(500).json({erros: err + "!"});
	}
}

export const getProducts = async (request: Request, response: Response): Promise<Response> => {
	try{
		const productRepository = await getRepository(Product);
		const product = await productRepository.createQueryBuilder("product").where(`product.userId =${request.id}`).paginate();
		return response.status(200).json(product);
	} catch(err){
		return response.status(500).json({erros: err + "!"});
	}
}