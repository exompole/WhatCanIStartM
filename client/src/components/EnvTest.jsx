import { useState, useEffect } from 'react';
import { ENV, validateEnv, logEnvInfo } from '../utils/env';
import api from '../services/api';

const EnvTest = () => {
  const [envInfo, setEnvInfo] = useState({});
  const [apiTest, setApiTest] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Log environment info
    logEnvInfo();
    
    // Set environment info for display
    setEnvInfo({
      API_URL: ENV.API_URL,
      APP_NAME: ENV.APP_NAME,
      APP_VERSION: ENV.APP_VERSION,
      MODE: ENV.MODE,
      IS_DEVELOPMENT: ENV.IS_DEVELOPMENT,
      IS_PRODUCTION: ENV.IS_PRODUCTION,
    });

    // Validate environment
    const isValid = validateEnv();
    console.log('Environment validation:', isValid ? '✅ Passed' : '❌ Failed');
  }, []);

  const testApiConnection = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/health');
      setApiTest({
        success: true,
        data: response.data,
        status: response.status,
      });
    } catch (error) {
      setApiTest({
        success: false,
        error: error.message,
        status: error.response?.status,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🔧 Environment Variables Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>📋 Environment Information</h3>
        <div style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '8px',
          fontFamily: 'monospace'
        }}>
          {Object.entries(envInfo).map(([key, value]) => (
            <div key={key} style={{ marginBottom: '5px' }}>
              <strong>{key}:</strong> {String(value)}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>🔗 API Connection Test</h3>
        <button 
          onClick={testApiConnection}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Testing...' : 'Test API Connection'}
        </button>

        {apiTest && (
          <div style={{ 
            marginTop: '10px',
            padding: '15px',
            backgroundColor: apiTest.success ? '#d4edda' : '#f8d7da',
            borderRadius: '5px',
            border: `1px solid ${apiTest.success ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            <h4>{apiTest.success ? '✅ Success' : '❌ Failed'}</h4>
            <pre style={{ fontSize: '12px', overflow: 'auto' }}>
              {JSON.stringify(apiTest, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>📝 Instructions</h3>
        <ol>
          <li>Check that all environment variables are loaded correctly</li>
          <li>Test the API connection to your backend</li>
          <li>Verify the API URL points to your Render backend in production</li>
          <li>Make sure CORS is configured properly on your backend</li>
        </ol>
      </div>

      <div style={{ 
        backgroundColor: '#fff3cd', 
        padding: '15px', 
        borderRadius: '5px',
        border: '1px solid #ffeaa7'
      }}>
        <h4>💡 Tips</h4>
        <ul>
          <li>In development: API should point to <code>http://localhost:5000</code></li>
          <li>In production: API should point to your Render URL</li>
          <li>Make sure your backend is running and accessible</li>
          <li>Check browser console for any CORS errors</li>
        </ul>
      </div>
    </div>
  );
};

export default EnvTest; 