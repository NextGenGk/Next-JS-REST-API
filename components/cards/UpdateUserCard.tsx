'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
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

export function UpdateUserCard() {
    const { id } = useParams()
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch(`/api/users/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((user) => {
                setName(user.name)
                setEmail(user.email)
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                toast.error("Failed to load user data", {
                    position: "bottom-right",
                    autoClose: 5000,
                });
                setLoading(false);
                router.push("/");
            })
    }, [id, router])

    const handleUpdate = async () => {
        const res = await fetch(`/api/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email }),
        })

        if (res.ok) {
            toast.success(`Updated user ${name}`, {
                position: "bottom-right",
                autoClose: 5000,
            })
            router.push("/")
        } else {
            toast.error("Failed to update user", {
                position: "bottom-right",
                autoClose: 5000,
            })
        }
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Edit User</CardTitle>
                <CardDescription>Update name and email</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="py-8 text-center">Loading user data...</div>
                ) : (
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
                )}
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button 
                    onClick={handleUpdate} 
                    className="w-full" 
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Update"}
                </Button>
            </CardFooter>
        </Card>
    )
}
