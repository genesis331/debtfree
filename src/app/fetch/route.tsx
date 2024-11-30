import {NextRequest, NextResponse} from "next/server";

export const runtime = 'edge';
export async function POST(req: NextRequest) {
    let content = req.body;

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SENDGRID_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: content
    });
    return NextResponse.json({ response: response }, { status: 200 });
}