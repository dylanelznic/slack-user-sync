import app from 'app';
import { db } from 'db';
import request from 'supertest';

describe('/v1/users', () => {
  it('should return a list of Users', async () => {
    const mockQuery = jest.fn();
    db.users.all = mockQuery.mockReturnValue([
      { id: 'test_id_1', user_id: 'test_user_id_1', team_id: 'test_team_id_1' },
      { id: 'test_id_2', user_id: 'test_user_id_2', team_id: 'test_team_id_2' },
    ]);
    return await request(app)
      .get('/v1/users')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          id: 'test_id_1',
          user_id: 'test_user_id_1',
          team_id: 'test_team_id_1',
        },
        {
          id: 'test_id_2',
          user_id: 'test_user_id_2',
          team_id: 'test_team_id_2',
        },
      ]);
  });
});

describe('/v1/user-events', () => {
  it('should return a list of UserEvents', async () => {
    const mockQuery = jest.fn();
    db.userEvents.all = mockQuery.mockReturnValue([
      {
        id: 'test_id_1',
        type: 'user_change',
        user_id: 'test_user_id_1',
        team_id: 'test_team_id_1',
      },
      {
        id: 'test_id_2',
        type: 'user_change',
        user_id: 'test_user_id_2',
        team_id: 'test_team_id_2',
      },
    ]);
    return await request(app)
      .get('/v1/user-events')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          id: 'test_id_1',
          type: 'user_change',
          user_id: 'test_user_id_1',
          team_id: 'test_team_id_1',
        },
        {
          id: 'test_id_2',
          type: 'user_change',
          user_id: 'test_user_id_2',
          team_id: 'test_team_id_2',
        },
      ]);
  });
});
