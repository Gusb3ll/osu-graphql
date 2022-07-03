import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'

import { osuResolver } from '@resolvers'

import app from './app'

(async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [osuResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app })

  app.listen(parseInt(process.env.PORT) || 3333, '0.0.0.0', () => {
    console.log(`Server started on port ${process.env.PORT || 3333}`)
  })
})()
