import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NeynarAPIClient } from '@standard-crypto/farcaster-js-neynar';

const publicUrl = 'https://frame-follow-back.vercel.app'
const apiKey = process.env.NEXT_NEYNAR_API_KEY;
const signerUuid = process.env.NEXT_APPROVED_UUID;

if (!apiKey || !signerUuid) {
  throw new Error('Missing required environment variables: NEXT_NEYNAR_API_KEY or NEXT_APPROVED_UUID');
}

async function followUser(accountFid: number) {
  const client = new NeynarAPIClient(apiKey as string);

  try {
    await client.v2.followUsers(signerUuid as string, [accountFid]);
  } catch (error) {
    console.error('Follow user failed', error, accountFid);
  }
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  try {
    const body: FrameRequest = await req.json();
    const { isValid, message } = await getFrameMessage(body, { neynarApiKey: apiKey });

    if (!isValid) {
      return generateErrorResponse('API is having a trouble..', undefined, '/text-4.png');
    }

    const { following, liked, interactor } = message;

    if (following || liked) {
      if (message?.button === 1 && interactor?.fid) {
        await followUser(interactor.fid);
        return generateSuccessResponse('I followed you back!');
      }
    } else {
      return generateErrorResponse('Please follow me first and click again', 'post', '/text-3.png');
    }
  } catch (error) {
    console.error('Error processing request', error);
    return generateErrorResponse('An error occurred', undefined, '/text-4.png');
  }
  return generateErrorResponse('Unexpected condition', undefined, '/text-4.png');
}

function generateSuccessResponse(label: string): NextResponse {
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [{ label }],
      image: `${publicUrl}/text-2.png`,
      post_url: `${publicUrl}/api/frame`,
    })
  );
}

function generateErrorResponse(label: string, action: 'post' | 'post_redirect' | undefined = undefined, imagePath: string = '/text-4.png'): NextResponse {
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label,
          action,
        },
      ],
      image: `${publicUrl}${imagePath}`,
      post_url: `${publicUrl}/api/frame`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';