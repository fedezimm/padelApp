import {Application} from 'express'

import * as usersController from '../controllers/users-controller';
import * as clubsController from '../controllers/clubs-controller';

const createRoutes = (app:Application):void => {
    // USERS ROUTES
    app.get('/users',usersController.getUsers);
    app.get('/users/:userId',usersController.getUserById);
    app.post('/users/create',usersController.createUser);
    // CLUBS ROUTES
    app.get('/clubs',clubsController.getClubs);
    app.get('/clubs/:clubId',clubsController.getClubById);
    app.post('/clubs/create',clubsController.createClub);
};

export default createRoutes