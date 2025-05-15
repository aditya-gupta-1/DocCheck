// src/pages/Home.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import ImageUploader from '../components/ImageUploader';
import LoadingSpinner from '../components/LoadingSpinner';
import ResultDisplay from '../components/ResultDisplay';
import { toast } from 'react-toastify'; 
import { Container, Typography, Grid, Box, Button } from '@mui/material'; 
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Home() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showUploader, setShowUploader] = useState(true);

  const handleUploadComplete = (data) => {
    setResults(data);
    setLoading(false);
    setShowUploader(false);
    toast.success('Document validated successfully!');
  };

  const handleUploadError = (errorMessage) => {
    setError(errorMessage);
    setLoading(false);
    toast.error(errorMessage || 'An error occurred during upload');
  };

  const handleFileUpload = async (documentFile, templateFile) => {
    const formData = new FormData();
    formData.append('document', documentFile);
    formData.append('template', templateFile);

    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        handleUploadComplete(data);
      } else {
        const errorData = await response.json();
        handleUploadError(errorData.error);
      }
    } catch (err) {
      handleUploadError('An error occurred while uploading the files.');
    }
  };

  const handleValidateAnother = () => {
    // Reset all states to initial values
    setResults(null);
    setLoading(false);
    setError(null);
    setShowUploader(true);
  };

  return (
    <Container maxWidth="lg">
      <Header />
      <Typography variant="h2" align="center" marginY={4}>
        Document Authentication and Verification
      </Typography>

      <Grid 
        container 
        spacing={2} 
        justifyContent="center" 
        alignItems="center"
      >
        {showUploader ? (
          <Grid item xs={12}>
            {loading ? (
              <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                style={{ height: '200px' }}
              >
                <LoadingSpinner />
              </Box>
            ) : (
              <ImageUploader onFileUpload={handleFileUpload} />
            )}
          </Grid>
        ) : (
          <Grid 
            item 
            xs={12} 
            container 
            direction="column" 
            alignItems="center" 
            spacing={3}
          >
            <Grid item>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 120
                }}
              >
                <ResultDisplay results={results} />
              </motion.div>
            </Grid>
            
            <Grid item>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleValidateAnother}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  padding: '10px 20px',
                  fontSize: '1rem',
                  borderRadius: 4
                }}
              >
                Validate Another Document
              </Button>
            </Grid>
          </Grid>
        )}

        {error && (
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <Box bgcolor="error.main" color="white" padding={2}>
              <Typography variant="body1">{error}</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default Home;