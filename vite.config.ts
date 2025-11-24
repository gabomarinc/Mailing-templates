
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode`
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react()],
    define: {
      // REMOVED: process.env.API_KEY injection
      // We no longer expose the API Key to the client for security reasons.
      // Calls are now handled by /api/generate
    }
  };
});
