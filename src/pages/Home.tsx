import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <Dumbbell className="w-8 h-8 text-white" />
            <span className="text-2xl font-bold text-white">Fanta Coaching</span>
          </div>
          <Link
            to="/login"
            className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all"
          >
            Connexion
          </Link>
        </nav>

        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-6">
            Transformez votre corps, transformez votre vie
          </h1>
          <p className="text-xl mb-12 text-purple-100">
            Un coaching personnalisé pour atteindre vos objectifs fitness
          </p>
          <Link
            to="/login"
            className="inline-flex items-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all"
          >
            <span>Commencer maintenant</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-lg">
            <h3 className="text-xl font-bold text-white mb-4">Programmes personnalisés</h3>
            <p className="text-purple-100">Des séances adaptées à vos objectifs et votre niveau</p>
          </div>
          <div className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-lg">
            <h3 className="text-xl font-bold text-white mb-4">Suivi expert</h3>
            <p className="text-purple-100">Un coach dédié pour vous accompagner</p>
          </div>
          <div className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-lg">
            <h3 className="text-xl font-bold text-white mb-4">Résultats garantis</h3>
            <p className="text-purple-100">Une méthode prouvée pour atteindre vos objectifs</p>
          </div>
        </div>
      </div>
    </div>
  );
}