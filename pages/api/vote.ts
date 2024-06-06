import redis, { databaseName } from '../../lib/redis'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { NextAuthOptions } from 'next-auth'

export default async (req, res) => {
  const session = (await getServerSession(
    req,
    res,
    authOptions as NextAuthOptions
  ))

  try {
    const {
      title,
      description,
      url,
      productImageUrl,
      submitterAvatarUrl,
      createdAt,
      user
    } = req.body
    const FEATURE = JSON.stringify({
      title,
      description,
      url,
      productImageUrl,
      createdAt,
      submitterAvatarUrl,
      user
    })
   // @ts-ignore: necessary because of session.user has id
    const hasUser = await redis.sadd('s:' + FEATURE, session.user.id)

    if (!hasUser) throw new Error('You have already voted')

    const data = await redis.zincrby(databaseName, 1, FEATURE)

    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
