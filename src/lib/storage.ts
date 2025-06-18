//익스텐션 환경 여부 확인
const isExtension = typeof chrome !== 'undefined' && !!chrome.storage;

/**
 * Extension 스토리지 데이터를 반환
 * @param key 가져올 키 이름
 * @returns StorageValueMap[K] 해당 키의 값
 */
const getFromExtensionStorage = <K extends StorageKeyValue>(
  key: K,
): Promise<StorageValueMap[K] | null> => {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], (result: Record<string, StorageValueMap[K]>) => {
      resolve(result[key] ?? null);
    });
  });
};

/**
 * Extension 스토리지에 데이터를 저장
 * @param key StorageKey
 * @param data StorageValueMap[K]
 * @returns boolean 성공여부
 */
const saveToExtensionStorage = <K extends StorageKeyValue>(
  key: K,
  data: StorageValueMap[K],
): Promise<boolean> => {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: data }, () => {
      resolve(true);
    });
  });
};

/**
 * 환경에 따라 스토리지에서 데이터 반환
 * @param key
 * @returns StorageValueMap[K] 해당 키의 값
 */
export const getFromStorage = async <K extends StorageKeyValue>(
  key: K,
): Promise<StorageValueMap[K] | null> => {
  if (isExtension) {
    return await getFromExtensionStorage(key);
  }

  const raw = localStorage.getItem(key);
  return raw ? (JSON.parse(raw) as StorageValueMap[K]) : null;
};

/**
 * 환경에 따라 스토리지에 데이터 저장
 * @param key
 * @param data 저장할 데이터
 * @returns boolean 성공 여부
 */
export const saveToStorage = async <K extends StorageKeyValue>(
  key: K,
  data: StorageValueMap[K],
): Promise<boolean> => {
  if (isExtension) {
    return await saveToExtensionStorage(key, data);
  }

  localStorage.setItem(key, JSON.stringify(data));
  return true;
};

/**
 * 환경에 따라 스토리지에서 데이터 제거
 * @param key 제거할 키 이름
 */
export const removeFromStorage = async (key: StorageKeyValue): Promise<void> => {
  if (isExtension) {
    return new Promise((resolve) => {
      chrome.storage.local.remove(key, () => resolve());
    });
  }

  localStorage.removeItem(key);
};
