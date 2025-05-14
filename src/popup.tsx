import './styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export const Popup = () => {
  return (
    <div className="relative flex w-[300px] flex-col items-center justify-center rounded-md bg-neutral-950 p-4 text-center text-gray-800">
      <img src="logo.svg" alt="delook-logo" className="mb-1" />
      <h1 className="-mt-6 rounded-md bg-primary p-2 text-sm font-semibold text-neutral-100">
        앗, Delook은 새 탭으로만 이용할 수 있어요!
      </h1>
    </div>
  );
};

createRoot(document.getElementById('popup-root')!).render(
  <StrictMode>
    <Popup />
  </StrictMode>,
);
