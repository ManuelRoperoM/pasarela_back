import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/users/domain/repositoires/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from 'src/users/domain/entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('A user with this email already exists');
    }
    const user = new User(
      0,
      dto.name,
      dto.email,
      dto.phone,
      new Date(),
      new Date(),
    );
    return this.userRepository.save(user);
  }
}
