import type { Request, Response } from 'express'

export interface ExpressContext {
  req: Request
  res: Response
}
