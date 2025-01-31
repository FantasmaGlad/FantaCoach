import React, { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { X } from 'lucide-react';

interface SessionFormProps {
  selectedDate: Date;
  userId?: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function SessionForm({ selectedDate, userId, onClose, onSuccess }: SessionFormProps) {
  const [sessionData, setSessionData] = useState({
    title: '',
    description: '',
    type: 'cardio',
    duration: 60,
    intensity: 'medium',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convertir la date en Timestamp Firebase
      const sessionDoc = {
        ...sessionData,
        date: Timestamp.fromDate(selectedDate),
        userId,
        createdAt: Timestamp.now(),
      };

      console.log('Sending session data:', sessionDoc);
      
      await addDoc(collection(db, 'sessions'), sessionDoc);
      console.log('Session added successfully');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error adding session:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Nouvelle séance</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Titre</label>
            <input
              type="text"
              value={sessionData.title}
              onChange={(e) => setSessionData({ ...sessionData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={sessionData.description}
              onChange={(e) => setSessionData({ ...sessionData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={sessionData.type}
              onChange={(e) => setSessionData({ ...sessionData, type: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="cardio">Cardio</option>
              <option value="musculation">Musculation</option>
              <option value="flexibility">Flexibilité</option>
              <option value="hiit">HIIT</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Durée (minutes)</label>
            <input
              type="number"
              value={sessionData.duration}
              onChange={(e) => setSessionData({ ...sessionData, duration: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              min="15"
              max="180"
              step="15"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Intensité</label>
            <select
              value={sessionData.intensity}
              onChange={(e) => setSessionData({ ...sessionData, intensity: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              <option value="low">Faible</option>
              <option value="medium">Moyenne</option>
              <option value="high">Élevée</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Créer la séance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}