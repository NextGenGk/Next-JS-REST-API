'use client'

// app/[id]/delete/page.tsx
import { DeleteUserCard } from "@/components/cards/DeleteUserCard"

export default function DeleteUserPage() {
    return (
        <main className="flex justify-center items-center min-h-screen p-4">
            <DeleteUserCard />
        </main>
    )
}
