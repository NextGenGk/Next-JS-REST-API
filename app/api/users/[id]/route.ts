// app/api/users/[id]/route.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        // Validate that id is a valid number
        const userId = Number(params.id);
        if (isNaN(userId)) {
            return new Response(JSON.stringify({ error: 'Invalid user ID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (user) {
            return new Response(JSON.stringify(user), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch user data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        // Validate that id is a valid number
        const userId = Number(params.id);
        if (isNaN(userId)) {
            return new Response(JSON.stringify({ error: 'Invalid user ID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const body = await request.json();
        const { name, email } = body;

        // Validate required fields
        if (!name || !email) {
            return new Response(JSON.stringify({ error: 'Name and email are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return new Response(JSON.stringify({ error: 'Invalid email format' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: { name, email },
        });
        return new Response(JSON.stringify(user), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return new Response(JSON.stringify({ error: 'User update failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        // Validate that id is a valid number
        const userId = Number(params.id);
        if (isNaN(userId)) {
            return new Response(JSON.stringify({ error: 'Invalid user ID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        await prisma.user.delete({
            where: { id: userId },
        });
        return new Response(null, { status: 204 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return new Response(JSON.stringify({ error: 'User deletion failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
