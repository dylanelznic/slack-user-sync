import { UsersService } from '../users';

describe('UsersService', () => {
  it('should parse a Slack user', () => {
    const usersService = new UsersService();
    const parsedUser = usersService.parseSlackUser({
      user: {
        id: 'test_user_id',
        team_id: 'test_team_id',
      },
    });
    expect(parsedUser).toEqual({
      user_id: 'test_user_id',
      team_id: 'test_team_id',
    });
  });
});
