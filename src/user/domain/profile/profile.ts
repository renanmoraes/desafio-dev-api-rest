import { User } from '../user/entity/user'

export type Profile = {
  user: User

  notification: boolean

  appNotification: boolean
}
