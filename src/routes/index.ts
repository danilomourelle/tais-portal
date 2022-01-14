import { Router } from 'express';

const routes = Router();

routes.get('/', (request, res) => res.json({ message: 'Hello World' }));

export default routes;
