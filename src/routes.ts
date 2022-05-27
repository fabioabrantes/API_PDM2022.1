import {Router} from 'express';
import {CreateUserController} from './controllers/CreateUserController';
import {CreateTagController} from './controllers/CreateTagController';
import {CreateComplimentController} from './controllers/CreateComplimentController';
import {AuthenticateController} from './controllers/AuthenticateController';

import {verifyTokenAuthentication} from './middleware/verifyTokenAuthentication';
import {verifyAdmin} from './middleware/verifyAdmin';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const authenticateController = new AuthenticateController();




router.post('/users', createUserController.handle);
router.post('/tags',verifyTokenAuthentication,verifyAdmin, createTagController.handle);
router.post('/compliments',verifyTokenAuthentication, createComplimentController.handle);
router.post('/auth', authenticateController.handle);



export {router}
