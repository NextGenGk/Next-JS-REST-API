'use client'

// app/[id]/page.tsx
import { UpdateUserCard } from "@/components/cards/UpdateUserCard"

export default function UpdateUserPage() {
    return (
        <main className="flex justify-center items-center min-h-screen p-4">
            <UpdateUserCard />
        </main>
    )
}
