import express, { Request, Response, NextFunction } from 'express';
import recipesRouter from './routes/recipes';

const app = express();

app.use(express.json());
app.use('/recipes', recipesRouter);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(200).json({ message: 'Internal server error' });
});

export default app;
