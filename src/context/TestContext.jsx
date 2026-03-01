import React, { createContext, useContext, useState } from 'react';

const TestContext = createContext();

export const useTest = () => useContext(TestContext);

export const TestProvider = ({ children }) => {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [testResults, setTestResults] = useState(null);

  const value = {
    selectedSubjects,
    setSelectedSubjects,
    testResults,
    setTestResults
  };

  return (
    <TestContext.Provider value={value}>
      {children}
    </TestContext.Provider>
  );
};
