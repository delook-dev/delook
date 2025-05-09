import './styles/index.css'; // ✅ Tailwind 포함

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export const Popup = () => {
  return (
    <div className="flex h-[150px] w-[400px] flex-col items-center justify-center bg-white px-6 py-8 text-center text-gray-800">
      <h1 className="mb-2 text-lg font-semibold">Delook은 새 탭에서만 이용할 수 있어요!</h1>
      <span className="text-sm text-gray-500">
        브라우저 설정에서 Delook을 시작 페이지로 지정해 주세요.
      </span>
    </div>
  );
};

createRoot(document.getElementById('popup-root')!).render(
  <StrictMode>
    <Popup />
  </StrictMode>,
);
