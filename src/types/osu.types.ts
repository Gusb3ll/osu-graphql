import { Field, ObjectType } from 'type-graphql'

@ObjectType({ description: 'Response from this graphql api, consis of message & error (if any)' })
export class statusResponse {
  @Field()
    message: string
}

@ObjectType({ description: 'Get osu oauth loginUrl' })
export class osuLoginUrlResponse {
  @Field()
    message: string

  @Field({ nullable: true })
    url?: string
}

@ObjectType()
export class osuTokenResponse {
  @Field()
    message: string

  @Field({ nullable: true })
    access_token?: string

  @Field({ nullable: true })
    refresh_token?: string
}

@ObjectType()
export class osuRevokeTokenResponse {
  @Field()
    message: string
}

@ObjectType()
class osuUserCountry {
  @Field()
    code: string

  @Field()
    name: string
}

@ObjectType()
class osuUserStatisticsGradeCounts {
  @Field()
    a: number

  @Field()
    s: number

  @Field()
    sh: number

  @Field()
    ss: number

  @Field()
    ssh: number
}

@ObjectType()
class osuUserStatisticsLevel {
  @Field()
    current: number

  @Field()
    progress: number
}

@ObjectType()
class osuUserStatisticsRank {
  @Field()
    country: number
}

@ObjectType()
class osuUserStatistics {
  @Field()
    country_rank: number

  @Field()
    global_rank: number

  @Field(() => osuUserStatisticsGradeCounts)
    grade_counts: osuUserStatisticsGradeCounts

  @Field()
    hit_accuracy: number

  @Field()
    is_ranked: boolean

  @Field(() => osuUserStatisticsLevel)
    level: osuUserStatisticsLevel

  @Field()
    maximum_combo: number

  @Field()
    play_count: number

  @Field()
    play_time: number

  @Field()
    pp: number

  @Field(() => osuUserStatisticsRank)
    rank: osuUserStatisticsRank

  @Field()
    ranked_score: number

  @Field()
    replays_watched_by_others: number

  @Field()
    total_hits: number

  @Field()
    total_score: number
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
export class osuUserResponse {
  @Field()
    message: string

  @Field(() => osuUser)
    user?: osuUser
}
