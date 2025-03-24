import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    // Parse the incoming request body as JSON
    const body = (await request.json()) as HandleUploadBody;

    try {
        // Handle the upload
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (
                pathname,
                clientPayload
            ) => {
                return {
                    allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
                    tokenPayload: JSON.stringify({
                    }),
                };
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                console.log('blob upload completed', blob, tokenPayload);
            },
        });
        // Return the response
        return NextResponse.json(jsonResponse);
    } catch (error) {
        // Return an error response
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 400 },
        );
    }
}