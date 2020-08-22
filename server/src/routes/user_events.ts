import { db } from 'db';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

/**
 * /user-events:
 *   get:
 *     description: Return a list of all UserEvents from the DB
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfuly returned a list of all UserEvents
 *       400:
 *         description: Error fetching UserEvents from the DB
 */
router.get(
  '/',
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const userEvents = db.userEvents.all();
      return res.send(userEvents);
    } catch (e) {
      next(e);
    }
  },
);

export default router;
