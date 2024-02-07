import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Follow me back',
      action: 'post',
    },
  ],
  image: `${process.env.NEXT_PUBLIC_URL}/text-1.png`,
  post_url: `${process.env.NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'Follow Me Back Frame',
  description: 'FMBF',
  openGraph: {
    title: 'Follow Me Back Frame',
    description: 'FMBF',
    images: [`${process.env.NEXT_PUBLIC_URL}/text-1.png`],
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