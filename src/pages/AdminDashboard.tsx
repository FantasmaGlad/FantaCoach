import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Dumbbell, Users, Calendar, LogOut, Plus } from 'lucide-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import SessionForm from '../components/SessionForm';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface User {
  id: string;
  email: string;
  name?: string;
  lastLogin?: string;
  program?: string;
}

interface Session {
  id: string;
  title: string;
  date: Timestamp;
  type: string;
  userId?: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>();

  const handleLogout = () => signOut(auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const usersCollection = collection(db, 'users');
        const userSnapshot = await getDocs(usersCollection);
        const usersList = userSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as User));
        setUsers(usersList);

        // Fetch sessions
        const sessionsCollection = collection(db, 'sessions');
        const sessionSnapshot = await getDocs(sessionsCollection);
        const sessionsList = sessionSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Session));
        setSessions(sessionsList);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDateClick = (arg: { date: Date }) => {
    setSelectedDate(arg.date);
    setShowSessionForm(true);
  };

  const handleSessionCreated = () => {
    // Refresh sessions
    const fetchSessions = async () => {
      const sessionsCollection = collection(db, 'sessions');
      const sessionSnapshot = await getDocs(sessionsCollection);
      const sessionsList = sessionSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Session));
      setSessions(sessionsList);
    };
    fetchSessions();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Dumbbell className="w-6 h-6 text-purple-600" />
            <span className="text-xl font-bold">Fanta Coaching - Admin</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendrier et Gestion des séances */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Calendar className="w-8 h-8 text-purple-600" />
                <h2 className="text-2xl font-bold">Calendrier des séances</h2>
              </div>
              <button
                onClick={() => {
                  setSelectedDate(new Date());
                  setShowSessionForm(true);
                }}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                <Plus className="w-5 h-5" />
                <span>Nouvelle séance</span>
              </button>
            </div>
            <div className="calendar-container">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="fr"
                events={sessions.map(session => ({
                  title: session.title,
                  date: session.date.toDate(),
                  backgroundColor: session.type === 'cardio' ? '#8B5CF6' : '#EC4899'
                }))}
                dateClick={handleDateClick}
                height="auto"
              />
            </div>
          </div>

          {/* Liste des utilisateurs */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <Users className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-bold">Utilisateurs inscrits</h2>
            </div>
            {loading ? (
              <div className="flex justify-center">
                <Dumbbell className="w-8 h-8 animate-spin text-purple-600" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Programme
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.name || 'Non renseigné'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.program || 'Non assigné'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedUserId(user.id);
                              setSelectedDate(new Date());
                              setShowSessionForm(true);
                            }}
                            className="text-purple-600 hover:text-purple-900"
                          >
                            Ajouter une séance
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {showSessionForm && selectedDate && (
        <SessionForm
          selectedDate={selectedDate}
          userId={selectedUserId}
          onClose={() => {
            setShowSessionForm(false);
            setSelectedDate(null);
            setSelectedUserId(undefined);
          }}
          onSuccess={handleSessionCreated}
        />
      )}
    </div>
  );
}