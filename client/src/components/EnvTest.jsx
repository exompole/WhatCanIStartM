import { useState } from 'react';
import { getApiUrl, logEnvInfo } from '../utils/env';
import { testAPI } from '../services/api';

const EnvTest = () => {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    const results = {};

    try {
      // Test 1: Environment variables
      results.env = {
        API_URL: getApiUrl(),
        VITE_API_URL: import.meta.env.VITE_API_URL,
        MODE: import.meta.env.MODE,
        DEV: import.meta.env.DEV,
        PROD: import.meta.env.PROD
      };

      // Test 2: Health endpoint
      try {
        const healthRes = await testAPI.health();
        results.health = { success: true, data: healthRes.data };
      } catch (error) {
        results.health = { success: false, error: error.message, status: error.response?.status };
      }

      // Test 3: Test endpoint
      try {
        const testRes = await testAPI.test();
        results.test = { success: true, data: testRes.data };
      } catch (error) {
        results.test = { success: false, error: error.message, status: error.response?.status };
      }

      // Test 4: Direct fetch to API
      try {
        const apiUrl = getApiUrl();
        const fetchRes = await fetch(`${apiUrl}/health`);
        results.directFetch = { 
          success: fetchRes.ok, 
          status: fetchRes.status,
          url: `${apiUrl}/health`
        };
      } catch (error) {
        results.directFetch = { success: false, error: error.message };
      }

    } catch (error) {
      results.error = error.message;
    }

    setTestResults(results);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🔧 Environment & API Test</h2>
      
      <button 
        onClick={runTests} 
        disabled={loading}
        style={{ 
          padding: '10px 20px', 
          marginBottom: '20px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Testing...' : 'Run Tests'}
      </button>

      {Object.keys(testResults).length > 0 && (
        <div style={{ textAlign: 'left' }}>
          <h3>Test Results:</h3>
          
          {testResults.env && (
            <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <h4>🌍 Environment Variables:</h4>
              <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '3px', overflow: 'auto' }}>
                {JSON.stringify(testResults.env, null, 2)}
              </pre>
            </div>
          )}

          {testResults.health && (
            <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <h4>🏥 Health Endpoint:</h4>
              <div style={{ color: testResults.health.success ? 'green' : 'red' }}>
                {testResults.health.success ? '✅ Success' : '❌ Failed'}
              </div>
              <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '3px', overflow: 'auto' }}>
                {JSON.stringify(testResults.health, null, 2)}
              </pre>
            </div>
          )}

          {testResults.test && (
            <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <h4>🧪 Test Endpoint:</h4>
              <div style={{ color: testResults.test.success ? 'green' : 'red' }}>
                {testResults.test.success ? '✅ Success' : '❌ Failed'}
              </div>
              <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '3px', overflow: 'auto' }}>
                {JSON.stringify(testResults.test, null, 2)}
              </pre>
            </div>
          )}

          {testResults.directFetch && (
            <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <h4>🌐 Direct Fetch:</h4>
              <div style={{ color: testResults.directFetch.success ? 'green' : 'red' }}>
                {testResults.directFetch.success ? '✅ Success' : '❌ Failed'}
              </div>
              <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '3px', overflow: 'auto' }}>
                {JSON.stringify(testResults.directFetch, null, 2)}
              </pre>
            </div>
          )}

          {testResults.error && (
            <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ff6b6b', borderRadius: '5px', backgroundColor: '#ffe6e6' }}>
              <h4>❌ General Error:</h4>
              <pre style={{ color: 'red' }}>{testResults.error}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnvTest; 