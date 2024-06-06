import React from 'react'
import List from '../components/list'

/**
 * In Next.js, pages directory defines the application's router automaticly.
 * When Next.js starts up, it scans the pages directory and creates a route
 * for each .tsx file. The file name is the route path
 * for example, pages/index.js is the root path of the application, that is /.
 */

function Home() {
  return (
    <>
      <div className="mt-12 mb-14">
        <List />
      </div>
    </>
  )
}

export default Home
