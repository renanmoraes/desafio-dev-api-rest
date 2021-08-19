import ApiResponse from '../../../../shared/models/api-response'
import { UserSignInRequest } from '../../infrastructure/user-sign-in-request/value/user-sign-in-request'

export type UserSignInRequestResponse = ApiResponse<UserSignInRequest>
export type UserSignInRequestsResponse = ApiResponse<UserSignInRequest[]>
