declare global {
  namespace Express {
    interface Request {
      uploadFolder?: string
    }
  }
}

export {}
