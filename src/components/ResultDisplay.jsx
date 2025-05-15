// src/components/ResultDisplay.jsx
import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
// import { motion } from 'framer-motion';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ResultDisplay = ({ results }) => {
  const isVerified = results.verification_result.includes('Verified');

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        maxWidth: 700, // Increased width
        width: '100%', 
        margin: 'auto', 
        borderRadius: 2, // Less rounded corners
        boxShadow: 3,
        border: isVerified 
          ? '2px solid rgba(76, 175, 80, 0.5)' 
          : '2px solid rgba(244, 67, 54, 0.5)'
      }}
    >
      <CardContent>
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          textAlign="center"
        >
          {isVerified ? (
            <CheckCircleOutlineIcon 
              sx={{ 
                color: 'success.main', 
                fontSize: 60, // Slightly smaller icon
                marginBottom: 2 
              }} 
            />
          ) : (
            <ErrorOutlineIcon 
              sx={{ 
                color: 'error.main', 
                fontSize: 60, // Slightly smaller icon
                marginBottom: 2 
              }} 
            />
          )}

          <Typography variant="h4" gutterBottom>
            Validation Results
          </Typography>

          <Divider sx={{ width: '100%', my: 2 }} />

          <Box 
            display="grid" 
            gridTemplateColumns="1fr 1fr" 
            gap={2} 
            width="100%"
            px={4} // Add horizontal padding
          >
            <Typography variant="body1" color="text.secondary" textAlign="left">
              Layout Confidence:
            </Typography>
            <Typography variant="body1" fontWeight="bold" textAlign="right">
              {results.layout_confidence}%
            </Typography>

            <Typography variant="body1" color="text.secondary" textAlign="left">
              Text Similarity:
            </Typography>
            <Typography variant="body1" fontWeight="bold" textAlign="right">
              {results.text_similarity}%
            </Typography>

            <Typography variant="body1" color="text.secondary" textAlign="left">
              Overall Accuracy:
            </Typography>
            <Typography variant="body1" fontWeight="bold" textAlign="right">
              {results.overall_accuracy}%
            </Typography>
          </Box>

          <Divider sx={{ width: '100%', my: 2 }} />

          <Typography 
            variant="h6" 
            color={isVerified ? 'success.main' : 'error.main'}
          >
            {results.verification_result}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResultDisplay;