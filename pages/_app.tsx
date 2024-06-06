/**
 * The file _app.tsx in Next.js is a special file that is 
 * used to customize the behavior of the application at the highest level. 
 * It acts as a wrapper around all of the pages in the application and 
 * is used to provide common functionality
 */

import React from 'react'

import PropTypes from 'prop-types'
import { SessionProvider } from 'next-auth/react'
import { SWRConfig } from 'swr'
import { ToastContainer } from 'react-toastify'
import { GlobalStoreProvider } from '../store/index'
import Head from 'next/head'

import Header from '../components/header'

import 'styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({
    session: PropTypes.object
  }).isRequired
}

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json())
        }}
      >
        <GlobalStoreProvider>
          <Head>
            <title>woven votes</title>
          </Head>

          <div>
            <Header />
            <main className="mt-16 max-w-3xl mx-auto px-4 overflow-scroll">
              <Component {...pageProps} />
            </main>
          </div>

          <ToastContainer autoClose={3000} hideProgressBar draggable={false} />
        </GlobalStoreProvider>
      </SWRConfig>
    </SessionProvider>
  )
}
