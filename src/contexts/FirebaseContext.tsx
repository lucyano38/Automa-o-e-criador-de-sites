import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export const OWNER_EMAIL = 'lucyano.pci@gmail.com';

interface FirebaseContextType {
  user: User | null;
  ownerEmail: string;
  isOwner: boolean;
  loading: boolean;
  authError: string | null;
  clearAuthError: () => void;
  signInWithGoogle: () => Promise<boolean>;
  loginAsOwnerDirect: (emailInput: string) => boolean;
  signOut: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType>({ 
  user: null,
  ownerEmail: OWNER_EMAIL,
  isOwner: false,
  loading: true,
  authError: null,
  clearAuthError: () => {},
  signInWithGoogle: async () => false,
  loginAsOwnerDirect: () => false,
  signOut: async () => {} 
});

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Local session backup for quick owner access
  const [isLocalOwnerSession, setIsLocalOwnerSession] = useState<boolean>(() => {
    try {
      return localStorage.getItem('foco_owner_auth_token') === 'lucyano_verified_session';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        if (firebaseUser.email?.toLowerCase() === OWNER_EMAIL.toLowerCase()) {
          setIsLocalOwnerSession(true);
          localStorage.setItem('foco_owner_auth_token', 'lucyano_verified_session');
          setAuthError(null);
        } else {
          setIsLocalOwnerSession(false);
          setAuthError(`Acesso Negado: O e-mail (${firebaseUser.email}) não possui permissão para acessar o ecossistema interno. O acesso é exclusivo para ${OWNER_EMAIL}.`);
        }
      }
    });
    return unsubscribe;
  }, []);

  const clearAuthError = () => {
    setAuthError(null);
  };

  const signInWithGoogle = async (): Promise<boolean> => {
    setAuthError(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      
      if (result.user?.email?.toLowerCase() === OWNER_EMAIL.toLowerCase()) {
        setIsLocalOwnerSession(true);
        localStorage.setItem('foco_owner_auth_token', 'lucyano_verified_session');
        return true;
      } else {
        setIsLocalOwnerSession(false);
        setAuthError(`O e-mail ${result.user?.email} não é autorizado. Apenas o titular Luciano (${OWNER_EMAIL}) possui acesso ao ecossistema.`);
        return false;
      }
    } catch (err: any) {
      console.warn('Google sign-in exception:', err);
      // If popup was blocked or failed, give clear instruction
      if (err?.code === 'auth/popup-blocked') {
        setAuthError('O navegador bloqueou a janela pop-up do Google. Permita pop-ups ou utilize o botão de Acesso Rápido do Titular.');
      } else {
        setAuthError(err?.message || 'Falha na autenticação do Google.');
      }
      return false;
    }
  };

  const loginAsOwnerDirect = (emailInput: string): boolean => {
    setAuthError(null);
    const cleanEmail = emailInput.trim().toLowerCase();
    if (cleanEmail === OWNER_EMAIL.toLowerCase()) {
      setIsLocalOwnerSession(true);
      localStorage.setItem('foco_owner_auth_token', 'lucyano_verified_session');
      return true;
    } else {
      setAuthError(`O e-mail digitado (${cleanEmail}) não tem permissão de titular. Apenas ${OWNER_EMAIL} tem acesso.`);
      return false;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
    setIsLocalOwnerSession(false);
    localStorage.removeItem('foco_owner_auth_token');
    setAuthError(null);
  };

  const isOwner = isLocalOwnerSession || (user?.email?.toLowerCase() === OWNER_EMAIL.toLowerCase());

  return (
    <FirebaseContext.Provider 
      value={{ 
        user, 
        ownerEmail: OWNER_EMAIL,
        isOwner, 
        loading, 
        authError,
        clearAuthError,
        signInWithGoogle, 
        loginAsOwnerDirect,
        signOut: handleSignOut 
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
