import {
  Arg,
  Ctx,
  Query,
  Resolver,
} from 'type-graphql'

import { osuService } from '@services'

import {
  getStatusResponse,
  osuLoginUrlResponse,
  osuRevokeTokenResponse,
  osuTokenResponse,
  osuUserResponse,
} from '@qltypes/osu.types'

import type { ExpressContext } from '@interfaces/context'

@Resolver()
export default class osuResolver {
  @Query(() => getStatusResponse)
  getStatus() {
    try {
      return { message: 'Ok' }
    }
    catch (err) {
      return { message: 'Internal server error' }
    }
  }

  @Query(() => osuLoginUrlResponse)
  getLoginUrl() {
    try {
      return { message: 'Successful', url: osuService.getLoginUrl() }
    }
    catch (err) {
      return { message: 'Internal server error' }
    }
  }

  @Query(() => osuTokenResponse)
  async getUserToken(@Arg('code', () => String) code: string, @Arg('state', () => String) state: string): Promise<osuTokenResponse | undefined> {
    try {
      const token = await osuService.getUserToken(code, state)
      if (!token)
        return { ok: false, message: 'Internal server error' }
      return { ok: true, message: 'Successful', access_token: token.access_token, refresh_token: token.refresh_token }
    }
    catch (err) {
      return { ok: false, message: 'Internal server error' }
    }
  }

  @Query(() => osuUserResponse)
  async getUser(@Ctx() { req }: ExpressContext): Promise<osuUserResponse | undefined> {
    try {
      const user = await osuService.getUser(req.headers)
      if (!user)
        return { ok: false, message: 'Internal server error' }
      return { ok: true, message: 'Successful', user }
    }
    catch (err) {
      return { ok: false, message: 'Internal server error' }
    }
  }

  @Query(() => osuRevokeTokenResponse)
  async revokeUserToken(): Promise<osuRevokeTokenResponse | undefined> {
    try {
      await osuService.revokeUserToken()
      return { ok: true, message: 'Successful' }
    }
    catch (err) {
      return { ok: false, message: 'Internal server error' }
    }
  }
}
