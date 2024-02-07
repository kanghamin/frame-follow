import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const publicUrl = 'https://frame-follow-back.vercel.app'

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Follow me back',
      action: 'post',
    },
  ],
  image: `${publicUrl}/text-1.png`,
  post_url: `${publicUrl}/api/frame`,
});

export const metadata: Metadata = {
  metadataBase: new URL(publicUrl),
  title: 'Follow Me Back Frame',
  description: 'FMBF',
  openGraph: {
    title: 'Follow Me Back Frame',
    description: 'FMBF',
    images: [`${publicUrl}/text-1.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>github: https://github.com/kanghamin/frame-follow</h1>
    </>
  );
}