'use client'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

export function DeleteUserCard() {
    const { id } = useParams()
    const router = useRouter()
    const [userName, setUserName] = useState("Unknown user")

    useEffect(() => {
        // Fetch user details to get the name
        fetch(`/api/users/${id}`)
            .then(res => res.json())
            .then(user => {
                if (user && user.name) {
                    setUserName(user.name)
                }
            })
            .catch(error => console.error("Error fetching user:", error))
    }, [id])

    const handleDelete = async () => {
        const res = await fetch(`/api/users/${id}`, {
            method: "DELETE",
        })

        if (res.ok) {
            toast.success(`${userName} has been deleted`, {
                position: "bottom-right",
                autoClose: 5000,
            })
            router.push("/")
        } else {
            toast.error("Failed to delete user", {
                position: "bottom-right",
                autoClose: 5000,
            })
        }
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Delete User</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    Are you sure you want to delete this user? This action cannot be undone.
                </p>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button variant="destructive" onClick={handleDelete} className="w-full">
                    Confirm Delete
                </Button>
                <Button variant="outline" onClick={() => router.push("/")} className="w-full">
                    Cancel
                </Button>
            </CardFooter>
        </Card>
    )
}
