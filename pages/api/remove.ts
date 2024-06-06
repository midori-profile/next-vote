import redis, { databaseName } from '../../lib/redis'
import { getServerSession } from 'next-auth/next'
import { NextAuthOptions } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async (req, res) => {
  const session = (await getServerSession(
    req,
    res,
    authOptions as NextAuthOptions
  ))

  try {
    // @ts-ignore: necessary because of session.user has role
    if (session.user.role !== 'admin') {
      throw new Error('Unauthorized')
    }
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

    const isRemove = await redis.zrem(databaseName, FEATURE)

    if (!isRemove) {
      throw new Error('Feature not found')
    }

    res.status(200).json({ body: 'success' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
