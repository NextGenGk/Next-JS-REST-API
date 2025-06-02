'use client'

// app/new/page.tsx
import { CreateUserCard } from "@/components/cards/CreateUserCard"

export default function NewUserPage() {
    return (
        <main className="flex justify-center items-center min-h-screen p-4">
            <CreateUserCard />
        </main>
    )
}
