import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/modules/users/users.service';

export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UsersService) {
    super();
  }

  serializeUser(user: any, done: (err: any, user: any) => void): any {
    done(null, user);
  }

  deserializeUser(user: any, done: (err: any, user: any) => void): any {
    const userDB = this.userService.findUserById(user.id);
    return userDB ? done(null, userDB) : done(null, null);
  }
}
