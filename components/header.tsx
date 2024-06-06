import React, { useState } from 'react'
import CreateForm from './create-form'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Modal } from 'antd'

export default function Header() {
  const { data: session, status } = useSession()
  const isAdmin = session?.user['role'] === 'admin'
  const [open, setOpen] = useState(false)
  const showModal = () => {
    setOpen(true)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }

  return (
    <header className="py-4 flex items-center justify-center border-b-2 border-gray-100 bg-white fixed top-0 w-full z-40">
      <h1 className="text-center text-3xl font-bold">Popular Products</h1>
      {status === 'authenticated' ? (
        <div className="flex">
          {isAdmin && (
            <button className="button ml-4" type="button" onClick={showModal}>
              Add Product
            </button>
          )}
          <img
            src={session.user.image}
            alt={session.user.name}
            width={40}
            className="rounded ml-2"
          />
          <button
            className="border py-1 px-2 rounded ml-4"
            type="button"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      ) : (
        <button className="button ml-4" type="button" onClick={() => signIn()}>
          Login
        </button>
      )}

      <Modal
        title="Add Product"
        open={open}
        width={800}
        onCancel={handleCancel}
        footer={[]}
      >
        <CreateForm closeModel={handleCancel} />
      </Modal>
    </header>
  )
}
