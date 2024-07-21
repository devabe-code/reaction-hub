"use client"
import { Button } from '@nextui-org/react';
import Link from 'next/link';

const Error: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-8">An unexpected error has occurred.</p>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
};

export default Error;
