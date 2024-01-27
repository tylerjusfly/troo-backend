import express, { Express, NextFunction, Request, Response } from 'express';
import { dataSource, initialiseDataSource } from './database/dataSource';
import { LogHelper } from './utils/LogHelper';
import cors from 'cors';
import { User } from './database/entites/user.entity';
import { apiRouter } from './modules/router';
import { requsetLogger } from './middlewares/requestlogger';

const app = express();
const port = process.env.PORT || 4000;

initialiseDataSource().then((isInitialised: boolean) => {
	if (isInitialised) {
		LogHelper.log(`DataSource has been initialised!`);
	} else {
		LogHelper.error(`Could not initialise database connection`);
	}
});

app.use(express.json());

app.use(
	cors({
		origin: '*',
		methods: ['GET', 'POST', 'PATCH', 'DELETE'],
		credentials: true,
	})
);

app.disable('x-powered-by');

app.use(requsetLogger);
app.use('/api', apiRouter);

app.use(genericErrorHandler);

app.get(['/', '/api'], async (req: Request, res: Response) => {
	return res.send('Hello Express typescript');
});

// app.get('/', async (req: Request, res: Response) => {
// 	return res.send('Hello Express typescript');
// });



function genericErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
	console.error('An unexpected error occurred', err);
	return res.status(404).json({ success: false, message: 'Internal Sever Error' });
	// return next();
}

//The 404 Route (ALWAYS Keep this as the last route)
// app.get('*', function (req, res) {
// 	res.status(404).json({ success: false, message: 'I have no idea of this endpoint' });
// });

app.listen(port, () => {
	LogHelper.info(`Server running at http://localhost:${port}`);
});
