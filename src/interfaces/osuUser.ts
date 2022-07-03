export interface osuUser {
  id: number
  avatar_url: string
  cover_url: string
  username: string
  country: {
    code: string
    name: string
  }
  statistics: {
    country_rank: number
    global_rank: number
    grade_counts: {
      a: number
      s: number
      sh: number
      ss: number
      ssh: number
    }
    hit_accuracy: number
    is_ranked: boolean
    level: {
      current: number
      progress: number
    }
    maximum_combo: number
    play_count: number
    play_time: number
    pp: number
    rank: {
      country: number
    }
    ranked_score: number
    replays_watched_by_others: number
    total_hits: number
    total_score: number
  }
}

export interface osuMinimalUser {
  id: number
  avatar: string
  cover: string
  username: string
  country: {
    code: string
    name: string
  }
  country_url: string
  statistics: {
    country_rank: number
    global_rank: number
    grade_counts: {
      a: number
      s: number
      sh: number
      ss: number
      ssh: number
    }
    hit_accuracy: number
    is_ranked: boolean
    level: {
      current: number
      progress: number
    }
    maximum_combo: number
    play_count: number
    play_time: number
    pp: number
    rank: {
      country: number
    }
    ranked_score: number
    replays_watched_by_others: number
    total_hits: number
    total_score: number
  }
}
