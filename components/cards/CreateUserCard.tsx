'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify"

export function CreateUserCard() {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const router = useRouter()

    const handleCreate = async () => {
        const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email }),
        })

        if (res.ok) {
            toast.success(`Created ${name} successfully`, {
                position: "bottom-right",
                autoClose: 5000,
            })
            router.push("/")
        } else {
            toast.error("Failed to create user", {
                position: "bottom-right",
                autoClose: 5000,
            })
        }
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Create a new user</CardTitle>
                <CardDescription>Enter name and email to create user</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button onClick={handleCreate} className="w-full">Create</Button>
            </CardFooter>
        </Card>
    )
}
