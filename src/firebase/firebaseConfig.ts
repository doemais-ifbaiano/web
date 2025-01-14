import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCVDdcsN5w6lmn8K_Qyw4aggt7pwSu070c",
  authDomain: "doe-mais-8892d.firebaseapp.com",
  projectId: "doe-mais-8892d",
  storageBucket: "doe-mais-8892d.firebasestorage.app",
  messagingSenderId: "175852613799",
  appId: "1:175852613799:web:c86772c6ea9f492438ab82",
  measurementId: "G-S0SYBRVSV6"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Inicialize o Analytics somente no cliente e em ambientes suportados
export let analytics: ReturnType<typeof getAnalytics> | null = null;

if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { initializeApp };
