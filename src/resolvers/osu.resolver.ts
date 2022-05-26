import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql'

import {
  osuLoginUrlResponse,
  osuRevokeTokenResponse,
  osuTokenResponse,
  osuUserResponse,
  statusResponse,
} from '../types/osu.types'

import type { ExpressContext } from '../interface/context'

import osuService from '../services/osu.service'

@Resolver()
export class osuResolver {
  @Query(() => statusResponse)
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

  @Mutation(() => osuTokenResponse)
  async getUserToken(@Arg('code') code: string, @Arg('state') state: string): Promise<osuTokenResponse> {
    try {
      const token = await osuService.getUserToken(code, state)
      if (!token)
        return { message: 'Internal server error' }
      return { message: 'Successful', access_token: token.access_token, refresh_token: token.refresh_token }
    }
    catch (err) {
      return { message: 'Internal server error' }
    }
  }

  @Mutation(() => osuUserResponse)
  async getUser(@Ctx() { req }: ExpressContext): Promise<osuUserResponse> {
    try {
      const user = await osuService.getUser(req.headers)
      if (!user)
        return { message: 'Internal server error' }
      return { message: 'Successful', user }
    }
    catch (err) {
      return { message: 'Internal server error' }
    }
  }

  @Mutation(() => osuRevokeTokenResponse)
  async revokeUserToken(): Promise<osuRevokeTokenResponse> {
    try {
      await osuService.revokeUserToken()
      return { message: 'Successful' }
    }
    catch (err) {
      return { message: 'Internal server error' }
    }
  }
}
