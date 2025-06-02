// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Validate that id is a valid number
        const userId = Number(params.id);
        if (isNaN(userId)) {
            return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (user) {
            return NextResponse.json(user);
        } else {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: 'Failed to fetch user data' }, 
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Validate that id is a valid number
        const userId = Number(params.id);
        if (isNaN(userId)) {
            return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
        }

        const body = await request.json();
        const { name, email } = body;

        // Validate required fields
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required' }, 
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' }, 
                { status: 400 }
            );
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: { name, email },
        });
        return NextResponse.json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { error: 'User update failed' }, 
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        // Validate that id is a valid number
        const userId = Number(params.id);
        if (isNaN(userId)) {
            return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
        }

        await prisma.user.delete({
            where: { id: userId },
        });
        return NextResponse.json(null, { status: 204 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json(
            { error: 'User deletion failed' }, 
            { status: 500 }
        );
    }
}
