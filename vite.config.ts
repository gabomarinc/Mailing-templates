
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react()],
    define: {
      // Securely expose ONLY the Gemini API Key to the frontend.
      // We do NOT expose 'env' directly to prevent BREVO_API_KEY from leaking to the browser.
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});