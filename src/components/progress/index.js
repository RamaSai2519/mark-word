import React, { useEffect, useState } from 'react';

const ProgressBar = ({ rank, word }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (rank > 0) {
      setProgress(100 - ((rank / 500) * 100));
    } else {
      setProgress(0);
    }
  }, [rank]);

  if (rank === 0) {
    return null;
  }

  return (
    <div className='flex w-1/2 justify-center items-center gap-2 mt-10'>
      <div className="flex items-center bg-gray-900 rounded-3xl p-1 w-full max-w-lg border border-white">
        <div
          className="bg-pink-500 h-9 rounded-full flex items-center justify-start relative"
          style={{ width: `${progress}%` }}
        >
          <span className="absolute left-2 text-xl text-white font-bold">{word}</span>
        </div>
      </div>
      <div className="pr-3 text-white font-bold text-3xl">
        #{rank}
      </div>
    </div>
  );
};

export default ProgressBar;
