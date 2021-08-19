export const unlessPath = {
  path: [
    { url: '/api/v1/utils/health', methods: ['GET'] },
    { url: '/api/v1/auth/user/sign-in-request', methods: ['POST'] },
    { url: '/api/v1/auth/user/sign-up-request', methods: ['POST'] },
    { url: '/api/v1/auth/user/recover-password-request', methods: ['POST'] }
  ]
}
