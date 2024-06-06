import React, { createContext, useEffect } from 'react'
import useSWR from 'swr'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'

import { SubmitInfo } from '../public/types'

export type Feature = {
  createdAt: number
  votes: number
  title: string
  description: string
  url: string
  productImageUrl: string
  submitterAvatarUrl: string
  user: { name: string; sub: string }
}

export interface IGlobalStore {
  data: Feature[]
  loadingData: boolean
  onRemove: (item: Feature) => void
  onVote: (item: Feature) => void
  onCreate: (submitInfo: SubmitInfo, callback?: () => void) => void
}

const GlobalStoreContext = createContext<IGlobalStore>(null)
GlobalStoreProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export function GlobalStoreProvider({ children }) {
  const { data, isValidating, mutate, error } = useSWR<Feature[]>('api/list', {
    fallbackData: []
  })

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  const onRemove = async (item) => {
    fetch('api/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        } else {
          mutate()
        }
      })
  }

  const onVote = async (item) => {
    fetch('api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        } else {
          mutate()
        }
      })
  }
  const onCreate = async (submitInfo: SubmitInfo, callback: () => void) => {
    fetch('api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...submitInfo
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        } else {
          toast.info('Your product has been added to the list.')
          mutate()
          callback()
        }
      })
  }

  return (
    <GlobalStoreContext.Provider
      value={{
        data,
        loadingData: isValidating,
        onRemove,
        onVote,
        onCreate
      }}
    >
      {children}
    </GlobalStoreContext.Provider>
  )
}

export default GlobalStoreContext
