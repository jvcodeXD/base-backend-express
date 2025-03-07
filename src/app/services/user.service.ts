import bcrypt from 'bcryptjs'
import { UserRepository } from '../repositories/user.repository'
import { User } from '../entities/user.entity'

export class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  create = async (userData: Partial<User>): Promise<User> => {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10)
    }
    return this.userRepository.create(userData)
  }

  getAll = async (): Promise<User[]> => {
    return this.userRepository.getAll()
  }

  getById = async (id: string): Promise<User | null> => {
    return this.userRepository.getById(id)
  }

  update = async (
    id: string,
    updateData: Partial<User>
  ): Promise<User | null> => {
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10)
    }
    return this.userRepository.update(id, updateData)
  }

  delete = async (id: string): Promise<boolean> => {
    return this.userRepository.delete(id)
  }
}
