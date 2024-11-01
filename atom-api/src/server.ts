import express from "express";
import bodyParse from "body-parser";
import cors from 'cors';
import * as routes from './routes';  
import config from './shared/config/env';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './shared/config/docs/swaggerConfiguration';

const app = express()
app.use(cors({
    origin: ['http://localhost:4200', 'https://tu-dominio.com'], // Cambia a los dominios permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
}));
app.use(bodyParse.json())


app.use("/api/users", routes.UserRouters)
app.use("/api/tasks", routes.TaskRouters)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack)
    res.status(500).send("Something broke!")
});

app.listen(config.PORT_APP, () => {
    console.log(`Server is running on port ${config.PORT_APP}`);
});