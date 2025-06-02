// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'

type User = {
  id: number
  name: string
  email: string
}

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('/api/users')
        .then(res => res.json())
        .then(setUsers)
  }, [])

  const deleteUser = async (id: number) => {
    try {
      const user = users.find(user => user.id === id)
      const userName = user ? user.name : 'Unknown user'

      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })

      if (res.ok) {
        setUsers(users.filter(user => user.id !== id))
        toast.success(`${userName} has been deleted`, {
          position: "bottom-right",
          autoClose: 5000,
        })
      } else {
        toast.error("Failed to delete user", {
          position: "bottom-right",
          autoClose: 5000,
        })
      }
    } catch (error) {
      toast.error("An error occurred while deleting the user", {
        position: "bottom-right",
        autoClose: 5000,
      })
      console.error("Delete error:", error)
    }
  }

  return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>

        <Link href="/new" className="text-blue-500">+ Create New User</Link>
        <ul className="mt-6 space-y-4">
          {users.map(user => (
              <li key={user.id} className="border p-4 rounded flex justify-between items-center">
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/${user.id}`} className="text-blue-500">Edit</Link>
                  <button onClick={() => deleteUser(user.id)} className="text-red-500">Delete</button>
                </div>
              </li>
          ))}
        </ul>
      </main>
  )
}
