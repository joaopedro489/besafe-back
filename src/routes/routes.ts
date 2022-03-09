import { Router } from 'express';
import authentication from "../middleware/authentication";
import { index, show, store, update, deleteUser} from '../controllers/UserController';
import { login } from '../controllers/AuthController';
import { getProducts, showProduct, storeProduct, updateProduct, deleteProduct} from '../controllers/ProductController';

const router = Router();

router.use('/private', authentication);

router.get('/user', index);
router.get('/user/:id', show);
router.post('/user', store);
router.put('/user/:id', update);
router.delete('/user/:id', deleteUser);

router.post('/login', login);

router.get('/private/product', getProducts);
router.get('/private/product/:id', showProduct);
router.post('/private/product', storeProduct);
router.put('/private/product/:id', updateProduct);
router.delete('/private/product/:id', deleteProduct);


export default router;