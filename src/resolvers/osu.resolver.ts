import { Query, Resolver } from 'type-graphql'

// import osuService from '../services/osu.service'

@Resolver()
export class osuResolver {
  @Query(() => String)
  getStatus() {
    try { 
      return 'Ok'
    }
    catch (err) { 
      return 'Error'
    }
  }
}
