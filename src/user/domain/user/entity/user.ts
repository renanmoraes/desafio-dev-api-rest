export type User = {
  id: string

  email: string

  password: string

  profileImage?: string

  ratings?: Rating[]

  currentLocation?: Location
}

export type Rating = {
  rating: number

  momentTime: Date
}

export type Location = {
  latitude: string

  longitude: string
}
