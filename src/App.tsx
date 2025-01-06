import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { SkillSwiper } from './components/skills/SkillSwiper';
import { SkillForm } from './components/skills/SkillForm';
import { Events } from './components/features/Events';
import { Learn } from './components/features/Learn';
import { Home } from './components/features/Home';
import { Profile } from './components/features/Profile';
import { Messages } from './components/Messages';
import { Login } from './components/Login';
import { useStore } from './store';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { currentUser } = useStore();

  if (!currentUser) {
    return <Login />;
  }

  return (
    <Layout onNavigate={setCurrentPage} currentPage={currentPage}>
      {currentPage === 'home' && <Home />}
      {currentPage === 'match' && (
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Find Skill Matches</h1>
          <SkillSwiper />
        </div>
      )}
      {currentPage === 'add-skill' && (
        <div className="max-w-md mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Add New Skill</h1>
          <SkillForm />
        </div>
      )}
      {currentPage === 'events' && <Events />}
      {currentPage === 'learn' && <Learn />}
      {currentPage === 'messages' && <Messages />}
      {currentPage === 'profile' && <Profile />}
    </Layout>
  );
}

export default App;