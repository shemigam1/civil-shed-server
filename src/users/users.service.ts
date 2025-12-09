import { Injectable } from '@nestjs/common';
import { User } from './user.types';

const users: User[] = [
  { userId: 1, username: 'john', password: 'changeme' },
  { userId: 2, username: 'maria', password: 'guess' },
];
@Injectable()
export class UsersService {
  async findUserByName(username: string): Promise<User | undefined> {
    return users.find((user) => user.username === username);
  }
}
