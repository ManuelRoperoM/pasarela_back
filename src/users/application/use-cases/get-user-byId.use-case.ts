import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/domain/entities/user.entity';
import { UserRepository } from 'src/users/domain/repositoires/user.repository';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return user;
  }
}
