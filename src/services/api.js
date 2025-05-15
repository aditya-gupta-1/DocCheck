/**
 * API service for the forgery detection system
 * Handles communication with the Flask backend
 */

const API_URL = 'http://localhost:5000';

/**
 * Send document images to the server for validation
 * 
 * @param {File} templateImage - The template document image
 * @param {File} testImage - The test document image to verify
 * @returns {Promise<Object>} - The validation result
 */
export const validateDocuments = async (templateImage, testImage) => {
  try {
    const formData = new FormData();
    formData.append('template', templateImage);
    formData.append('test', testImage);
    
    const response = await fetch(`${API_URL}/api/validate`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Validation error:', error);
    throw error;
  }
};

/**
 * Get system status from the server
 * 
 * @returns {Promise<Object>} - The system status
 */
export const getSystemStatus = async () => {
  try {
    const response = await fetch(`${API_URL}/api/status`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Status check error:', error);
    throw error;
  }
};