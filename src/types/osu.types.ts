import { Field, Float, Int, InterfaceType, ObjectType } from 'type-graphql'

@InterfaceType()
export class baseResponse {
  @Field(() => Boolean)
    ok: boolean

  @Field(() => String)
    message: string
}

@ObjectType({ implements: baseResponse })
export class getStatusResponse extends baseResponse { }

@ObjectType({ implements: baseResponse })
export class osuLoginUrlResponse extends baseResponse {
  @Field(() => String, { nullable: true })
    url?: string
}

@ObjectType({ implements: baseResponse })
export class osuTokenResponse extends baseResponse {
  @Field(() => String, { nullable: true })
    access_token?: string

  @Field(() => String, { nullable: true })
    refresh_token?: string
}

@ObjectType({ implements: baseResponse })
export class osuRevokeTokenResponse extends baseResponse { }

@ObjectType()
class osuUserCountry {
  @Field(() => String)
    code: string

  @Field(() => String)
    name: string
}

@ObjectType()
class osuUserStatisticsGradeCounts {
  @Field(() => Int)
    a: number

  @Field(() => Int)
    s: number

  @Field(() => Int)
    sh: number

  @Field(() => Int)
    ss: number

  @Field(() => Int)
    ssh: number
}

@ObjectType()
class osuUserStatisticsLevel {
  @Field(() => Float)
    current: number

  @Field(() => Float)
    progress: number
}

@ObjectType()
class osuUserStatisticsRank {
  @Field(() => Int)
    country: number
}

@ObjectType()
class osuUserStatistics {
  @Field(() => Int)
    country_rank: number

  @Field(() => Int)
    global_rank: number

  @Field(() => osuUserStatisticsGradeCounts)
    grade_counts: osuUserStatisticsGradeCounts

  @Field(() => Float)
    hit_accuracy: number

  @Field(() => Boolean)
    is_ranked: boolean

  @Field(() => osuUserStatisticsLevel)
    level: osuUserStatisticsLevel

  @Field(() => Int)
    maximum_combo: number

  @Field(() => Int)
    play_count: number

  @Field(() => Float)
    play_time: number

  @Field(() => Float)
    pp: number

  @Field(() => osuUserStatisticsRank)
    rank: osuUserStatisticsRank

  @Field(() => Int)
    ranked_score: number

  @Field(() => Int)
    replays_watched_by_others: number

  @Field(() => Int)
    total_hits: number

  @Field(() => Int)
    total_score: number
}

@ObjectType()
class osuUser {
  @Field(() => Int)
    id: number

  @Field(() => String)
    avatar: string

  @Field(() => String)
    username: string

  @Field(() => osuUserCountry)
    country: osuUserCountry

  @Field(() => String)
    country_url: string

  @Field(() => osuUserStatistics)
    statistics: osuUserStatistics
}

@ObjectType({ implements: baseResponse })
export class osuUserResponse extends baseResponse {
  @Field(() => osuUser, { nullable: true })
    user?: osuUser
}
