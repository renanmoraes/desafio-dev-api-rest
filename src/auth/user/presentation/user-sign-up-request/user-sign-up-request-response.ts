import ApiResponse from '../../../../shared/models/api-response'
import { UserSignUpRequest } from '../../infrastructure/user-sign-up-request/value/user-sign-up-request'

export type UserSignUpRequestResponse = ApiResponse<UserSignUpRequest>
export type UserSignUpRequestsResponse = ApiResponse<UserSignUpRequest[]>
