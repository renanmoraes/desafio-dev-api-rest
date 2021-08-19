import jwt_decode from 'jwt-decode'

export enum ClientType {
  User = 'user'
}

export type Authorization = {
  clientId: string
  clientType: ClientType
}

const decoder = (req: any, _res: any, next: any) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]

    if (token) {
      const decode: any = jwt_decode(token)
      req.authorization = decode.authorization
      next()
      return
    }

    next()
  } else {
    req.authorization = null
    next()
  }
}

export default decoder
