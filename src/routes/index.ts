import {Application} from 'express'

import * as usersController from '../controllers/users-controller';

const createRoutes = (app:Application):void => {
    app.get('/users',usersController.getUsers);
    app.get('/users/:userId',usersController.getUserById);
    app.post('/users/create',usersController.createUser);
};

export default createRoutes