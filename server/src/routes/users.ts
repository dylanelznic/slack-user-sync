import { db } from 'db';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

/**
 * /users:
 *   get:
 *     description: Return a list of all Users with UserEvent
 *       metadata from the DB
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfuly returned a list of all Users
 *       400:
 *         description: Error fetching Users from the DB
 */
router.get(
  '/',
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const users = await db.users.all();
      return res.send(users);
    } catch (e) {
      next(e);
    }
  },
);

export default router;
