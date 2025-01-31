import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Dumbbell, Calendar, User, LogOut } from 'lucide-react';

export default function UserDashboard() {
  const handleLogout = () => signOut(auth);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Dumbbell className="w-6 h-6 text-purple-600" />
            <span className="text-xl font-bold">Fanta Coaching</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600"
          >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <Calendar className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-bold">Prochaines séances</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="font-semibold">Séance Cardio</p>
                <p className="text-gray-600">Lundi 15 Mars - 10:00</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="font-semibold">Renforcement musculaire</p>
                <p className="text-gray-600">Mercredi 17 Mars - 14:00</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <User className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-bold">Mon profil</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Objectif</span>
                <span className="font-semibold">Perte de poids</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Programme</span>
                <span className="font-semibold">Intensif</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Séances complétées</span>
                <span className="font-semibold">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}