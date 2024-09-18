import { useToggleHandler } from '@/hooks/useToggleHandler';
import { useEffect } from 'react';

export const useSaveLoginState = () => {
  const {
    value: loginSave,
    handleValue: handleLoginSave,
    setValue: setLoginSave,
  } = useToggleHandler();
  useEffect(() => {
    if (document.cookie.includes('isLoginSave=true')) {
      setLoginSave(true);
    }
  }, []);
  useEffect(() => {
    if (loginSave) {
      document.cookie = 'isLoginSave=true; path=/; max-age=2592000';
    } else {
      document.cookie = 'isLoginSave=; path=/; max-age=0';
    }
  }, [loginSave]);

  return { loginSave, handleLoginSave };
};
