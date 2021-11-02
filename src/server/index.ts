import express, {Application, NextFunction, Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import createError from 'http-errors';
import compression from 'compression';
import helmet from 'helmet';

import DocsRouter from '../resources/docs/docs.router';
import HealthRouter from '../resources/health/health.router';
import TaskRouter from '../resources/task/task.router';

import logger from '../utils/logger';

import {handleError} from '../middleware/errorHandler.mddleware';

const app: Application = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(bodyParser.json());

app.use(compression());

app.use((req: Request, res: Response, next: NextFunction) => {
 logger.info(`ACCESS LOG: ${req.url}`);
 next();
});

app.use(handleError);

// attach routes
app.use('/v1/docs', DocsRouter);
app.use('/v1/health', HealthRouter);
app.use('/v1/tasks', TaskRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
 next(createError(404));
});

export default app;
