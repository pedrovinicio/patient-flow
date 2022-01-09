import React from 'react';
import QuestionFlow from './components/Flow/QuestionFlow';
import AppHeader from './components/UI/AppHeader';
import heartBurnJson from './fixtures/heartburn.json'

function App() {

  return (
    <div>
      <AppHeader>Heartburn Checker</AppHeader>
      {<QuestionFlow questions={heartBurnJson.questions} outcomes={heartBurnJson.outcomes}></QuestionFlow>}
    </div>
  );
}

export default App;
