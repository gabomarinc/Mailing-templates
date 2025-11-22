
/**
 * Service to handle email subscriptions via our Vercel Backend.
 * This prevents exposing the API Key in the browser.
 */

export const subscribeToNewsletter = async (email: string): Promise<boolean> => {
    // We call our own serverless function located at /api/subscribe
    // Vercel automatically routes requests to /api/* to the functions in the api folder
    const BACKEND_ENDPOINT = '/api/subscribe';

    try {
        const response = await fetch(BACKEND_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Backend Error:", errorData);
            // Even if it fails technically, we often want to let the user proceed 
            // so they don't get stuck if our backend is down.
            return true; 
        }

        return true;
    } catch (error) {
        console.error("Failed to connect to backend:", error);
        // Return true to allow the user to unlock the content even if the network fails
        return true; 
    }
};
