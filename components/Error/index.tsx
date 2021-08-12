import React from 'react';
import Link from 'next/link';

interface Props {
  message: string;
}

export default function Error({ message }: Props) {
  return (
    <div className="flex mt-48 justify-center">
      <div className="w-3/4 text-center">
        <p className="text-2xl">{message}</p>

        <p className="mt-4">If you think this is a bug, please contact the Screensaver team on <a href="https://discord.gg/r2DRdMctzh" className="text-red-300 hover:underline">Discord</a>.</p>

        <Link href="/gallery">
          <button className="button mt-6 w-72 justify-center inline-flex items-center px-6 py-3 border border-red-300 shadow-sm text-red-300 font-medium rounded-xs text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Go to gallery</button>
        </Link>
      </div>
    </div>
  );
}
