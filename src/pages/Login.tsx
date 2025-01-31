import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { Dumbbell } from 'lucide-react';

export default function Login() {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <Dumbbell className="w-12 h-12 text-purple-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Bienvenue sur Fanta Coaching</h2>
          <p className="text-gray-600 text-center mt-2">
            Connectez-vous pour accéder à votre espace personnel
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          <span>Se connecter avec Google</span>
        </button>
      </div>
    </div>
  );
}