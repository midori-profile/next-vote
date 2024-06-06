import redis, { databaseName } from '../../lib/redis'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { NextAuthOptions } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = (await getServerSession(
    req,
    res,
    authOptions as NextAuthOptions
  ))
  try {
    const newFeature = {
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
      productImageUrl: req.body.productImageUrl,
      createdAt: Date.now(),
      submitterAvatarUrl: session.user.image,
      user: {
        name: session.user.name,
        // @ts-ignore: necessary because of session.user has id
        sub: session.user.id
      }
    }
    await redis.zadd(
      databaseName,
      // Add a member only if it does not exist in an ordered collection.
      { nx: true },
      { score: 0, member: JSON.stringify(newFeature) }
    )
    res.json({ body: 'success' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
