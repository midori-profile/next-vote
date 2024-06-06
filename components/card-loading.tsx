import React from 'react'
import { Skeleton } from 'antd'

interface Props {
  loading: boolean
}

const SkeletonCard: React.FC<Props> = ({ loading }) => {
  return (
    <div className="p-4 rounded border border-gray-300 flex">
      <Skeleton.Input
        active={loading}
        style={{ width: '220px', height: '180px' }}
      />
      <div className="ml-10">
        <Skeleton.Input active={loading} />
        <Skeleton className="mt-2" active={loading} paragraph={{ rows: 1 }} />
        <div className="mt-8">
          <Skeleton.Avatar active={loading} size={'large'} shape={'circle'} />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard
