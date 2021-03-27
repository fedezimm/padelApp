import {Application} from 'express'

import userRouter from './user-router';
import clubRouter from './club-router';

const createRoutes = (app: Application):void => {
    app.use('/users', userRouter);
    app.use('/clubs', clubRouter);
}

export default createRoutes;
