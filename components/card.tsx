import React, { useContext } from 'react'
import GlobalStoreContext, { Feature } from '../store/index'
import { useSession } from 'next-auth/react'
import { Button } from 'antd'

export default function Card({ item }: { item: Feature }) {
  const { onRemove, onVote } = useContext(GlobalStoreContext)
  const { data: session, status } = useSession()

  const {
    votes = 0,
    title,
    description,
    productImageUrl,
    user,
    submitterAvatarUrl = ''
  } = item

  const isAdmin = session?.user['role'] === 'admin'

  return (
    <div className="flex p-4 bg-white border border-gray-300 rounded">
      <img className="w-56 h-full rounded" src={productImageUrl} alt={title} />
      <div className="flex flex-col pl-10 pt-1">
        <div className="flex">
          <Button
            disabled={status !== 'authenticated'}
            className="
            pt-3
            pb-6
            border
        flex flex-col items-center w-10
        hover:bg-zinc-100"
            onClick={() => onVote(item)}
          >
            <div className="triangle-up"></div>
          </Button>
          <div className="py-1 font-bold text-2xl ml-2">{votes}</div>
        </div>
        <a
          href={'#'}
          className="font-bold text-regal-blue hover:underline mt-6 cursor-pointer text-xl"
        >
          {title}
        </a>
        <p
          className="text-gray-600 mt-1 text-base"
          style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}
        >
          {description}
        </p>
        <div className="flex items-center mt-4">
          <div className="text-gray-500 text-sm">Submitted By: </div>
          <img
            src={submitterAvatarUrl}
            alt={user?.name}
            width={40}
            className="rounded-full ml-2 mr-2"
          />
          {user?.name && (
            <>
              <span className="text-gray-500 text-sm mr-2">{user.name}</span>
            </>
          )}
          {isAdmin && (
            <>
              <button
                type="button"
                className="hover:underline text-regal-blue"
                onClick={() => {
                  if (confirm('Product will be removed. Are you sure?')) {
                    onRemove(item)
                  }
                }}
              >
                Remove
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
