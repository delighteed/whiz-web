import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { message: 'Invalid email address' },
                { status: 400 }
            );
        }

        const filePath = path.join(process.cwd(), 'waitlist.csv');
        const timestamp = new Date().toISOString();
        const csvLine = `"${email}","${timestamp}"\n`;

        // Ensure file exists with header
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, 'email,timestamp\n');
        }

        fs.appendFileSync(filePath, csvLine);

        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (error) {
        console.error('Waitlist error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
