import React from 'react';
import { useRouter } from 'next/navigation';

const GoBackBtn: React.FC = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="inline-flex items-center px-4 py-2 bg-gray-500 border border-transparent rounded-md font-medium text-xs text-white hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={() => window.location.reload()}
    >
      Go Back
    </button>
  );
};

export default GoBackBtn;