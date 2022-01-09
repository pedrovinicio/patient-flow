import React from 'react';
import QuestionFlow from './components/Flow/QuestionFlow';
import heartBurnJson from './fixtures/heartburn.json'

function App() {

  return (
    <div>
      {<QuestionFlow questions={heartBurnJson.questions} outcomes={heartBurnJson.outcomes}></QuestionFlow>}
    </div>
  );
}

export default App;
