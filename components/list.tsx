import React, { useContext, useState } from 'react'
import Card from './card'
import CardLoading from './card-loading'
import GlobalStoreContext from '../store/index'
import { sortBy } from 'lodash-es'

export default function List() {
  const { data, loadingData } = useContext(GlobalStoreContext)
  const dataInverted = sortBy(data, ['votes', 'createdAt']).reverse()

  const [showAll, showAllSet] = useState(false)

  const MAX_SHOW_DATA = 10
  const HAS_HIDE_DATA = dataInverted.length > MAX_SHOW_DATA
  const SHOW_DATA = showAll
    ? dataInverted
    : dataInverted.slice(0, MAX_SHOW_DATA)

  if (loadingData) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4].map((_, index) => (
          <CardLoading key={index} loading={true} />
        ))}
      </div>
    )
  }

  return (
    <>
      {dataInverted.length > 0 ? (
        <div className="space-y-6">
          {/* first 10 item */}
          {SHOW_DATA.map((item, index) => (
            <Card key={index} item={item} />
          ))}

          {/* show all */}
          <button
            className="button-ghost"
            type="button"
            hidden={!HAS_HIDE_DATA || showAll}
            onClick={() => {
              showAllSet(true)
            }}
          >
            Show all products
          </button>
        </div>
      ) : (
        <div className="text-center text-zinc-400">
          <p>
            Empty state, Only the administrator can add products. If you want to
            be administrator, add your github email to NEXT_PUBLIC_ADMIN_EMAILS
            in the.env.local file 😩
          </p>
        </div>
      )}
    </>
  )
}
