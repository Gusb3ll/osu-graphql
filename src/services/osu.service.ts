import type { IncomingHttpHeaders } from 'http2'

import { URLSearchParams } from 'url'
import type { NextFunction, Request, Response } from 'express'
import axios from 'axios'
import type { osuUser } from '../interface/osuUser'

function getHeaders(req: IncomingHttpHeaders) {
  return {
    headers: {
      Authorization: `${req.authorization}`,
    },
  }
}

function getLoginUrl() {
  const params = new URLSearchParams()
  params.append('client_id', process.env.OSU_API_V2_CLIENTID!)
  params.append('redirect_uri', process.env.OSU_API_V2_CALLBACK_URL!)
  params.append('response_type', 'code')
  params.append('scope', 'identify')
  params.append('state', JSON.stringify({ scope: 'identify' }))
  return `https://osu.ppy.sh/oauth/authorize?${params}`
}

async function getUserToken(code: string, state: string) {
  const stated = JSON.parse(state)
  const params = new URLSearchParams()
  params.append('client_id', process.env.OSU_API_V2_CLIENTID!)
  params.append('redirect_uri', process.env.OSU_API_V2_CALLBACK_URL!)
  params.append('client_secret', process.env.OSU_API_V2_CLIENTSECRET!)
  params.append('code', code)
  params.append('grant_type', 'authorization_code')
  params.append('scope', stated.scope)
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }
  const token = await axios
    .post('https://osu.ppy.sh/oauth/token', params, { headers: config.headers })
    .then(res => res.data)
    .catch((error) => { return error.response.data })
  return token
}

async function revokeUserToken() {
  await axios.delete('https://osu.ppy.sh/api/v2/oauth/tokens/current', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(res => res.data)
    .catch((error) => {
      return error.response.data
    })
  return { message: 'Success' }
}

function getFlagURL(flag: string) {
  let url = 'https://osu.ppy.sh/assets/images/flags/'

  for (let i = 0; i < flag.length; i++) {
    url += (flag.charCodeAt(i) + 127397).toString(16)
    url += i !== flag.length - 1 ? '-' : '.svg'
  }
  return url
}

function minimalUser(user: osuUser) {
  return {
    id: user.id,
    avatar: user.avatar_url,
    cover: user.cover_url,
    username: user.username,
    country: user.country,
    country_url: getFlagURL(user.country.code),
    statistics: user.statistics,
  }
}

async function getUser(header: IncomingHttpHeaders) {
  const user = await axios.get('https://osu.ppy.sh/api/v2/me', getHeaders(header))
    .then(res => res.data)
    .catch((error) => {
      return error.response.data
    })

  if (user.authentication === 'basic')
    return undefined

  return minimalUser(user)
}

async function checkAccount(req: Request, res: Response, next: NextFunction) {
  const user = await getUser(req.headers)
  if (!user)
    res.status(401).send({ error: 'Unauthorized' })

  else
    next()
}

export default { getLoginUrl, getUserToken, revokeUserToken, getUser, checkAccount }
