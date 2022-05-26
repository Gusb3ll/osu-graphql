import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import type { ExpressContext } from '../interface/context'

import osuService from '../services/osu.service'

@ObjectType({ description: 'Response from this graphql api, consis of message & error (if any)' })
class statusResponse {
  @Field()
    message: string
}

@ObjectType({ description: 'Get osu oauth loginUrl' })
class osuLoginUrlResponse {
  @Field()
    message: string

  @Field({ nullable: true })
    url?: string
}

@ObjectType()
class osuUserTokenResponse {
  @Field()
    message: string

  @Field({ nullable: true })
    access_token?: string

  @Field({ nullable: true })
    refresh_token?: string
}

@ObjectType()
class osuUserCountry {
  @Field()
    code: string

  @Field()
    name: string
}

@ObjectType()
class osuUserStatistics {
  @Field()
    country_rank: number

  @Field()
    global_rank: number
}

@ObjectType()
class osuUser {
  @Field()
    id: number

  @Field()
    avatar: string

  @Field()
    username: string

  @Field(() => osuUserCountry)
    country: osuUserCountry

  @Field()
    country_url: string

  @Field()
    statistics: osuUserStatistics
}

@ObjectType()
class osuUserResponse {
  @Field()
    message: string

  @Field(() => osuUser)
    user?: osuUser
}

@Resolver()
export class osuResolver {
  @Query(() => statusResponse)
  getStatus() {
    try {
      return { message: 'Successful' }
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

  @Mutation(() => osuUserTokenResponse)
  async getUserToken(@Arg('code') code: string, @Arg('state') state: string): Promise<osuUserTokenResponse> {
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
      const resUser = await osuService.getUser(req.headers)
      if (!resUser)
        return { message: 'Internal server error' }
      return { message: 'Successful', user: resUser }
    }
    catch (err) {
      return { message: 'Internal server error' }
    }
  }
}
