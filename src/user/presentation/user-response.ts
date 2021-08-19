import ApiResponse from '../../shared/models/api-response'
import { User } from '../domain/user/entity/user'

export type UserResponse = ApiResponse<User>
export type UsersResponse = ApiResponse<User[]>
