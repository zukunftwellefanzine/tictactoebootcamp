import React from 'react';
import Game from './components/Game';

function App() {
  console.log('App component rendered');
  
  return (
    <div className="min-vh-100" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <Game />
    </div>
  );
}

export default App;