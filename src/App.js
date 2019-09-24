
import React from 'react';

import AdaptiveViewer from './components/AdaptiveViewer';
import kitchenImage from './assets/images/kitchen.jpg';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <AdaptiveViewer imageUrl={kitchenImage} />
      </header>
    </div>
  );
};

export default App;
