// src/components/ImageUploader.jsx
import React, { useState } from 'react';
import { Button, Typography, Box, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';

const ImageUploader = ({ onFileUpload }) => {
  const [dragging, setDragging] = useState(false);
  const [documentFile, setDocumentFile] = useState(null);
  const [templateFile, setTemplateFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length === 2) {
      const tmplFile = files[0].type.startsWith('image/') ? files[0] : null;
      const docFile = files[1].type.startsWith('image/') ? files[1] : null;

      if (tmplFile && docFile) {
        setTemplateFile(tmplFile);
        setDocumentFile(docFile);
      } else {
        alert('Please upload valid image files.');
      }
    } else {
      alert('Please drop two files: a template image and a document image.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleUpload = () => {
    if (documentFile && templateFile) {
      onFileUpload(documentFile, templateFile);
    }
  };

  const handleImageChange = (type) => {
    if (type === "template") {
      setTemplateFile(null);
    } else {
      setDocumentFile(null);
    }
  };

  const renderImagePreview = (file, type) => {
    if (file) {
      return (
        <Box position="relative" display="inline-block" sx={{ width: '150px', height: 'auto', overflow: 'hidden', maxHeight: '150px'}}>
          <motion.img 
            src={URL.createObjectURL(file)} 
            alt="Preview" 
            style={{ 
              width: '100%',  
              height: 'auto', 
              objectFit: 'cover',
              transition: 'opacity 0.3s ease-in-out'
            }} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <IconButton
            color="primary"
            aria-label="change image"
            onClick={() => handleImageChange(type)}
            sx={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              backgroundColor: 'white',
              borderRadius: '50%',
              boxShadow: 1
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>
      );
    }
    return null;
  };

  return (
    <motion.div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      style={{
        padding: '20px',
        border: dragging ? '2px dashed #3f51b5' : '2px dashed #ccc',
        borderRadius: '8px',
        background: dragging ? '#e3f2fd' : '#fafafa',
        transition: 'background 0.3s ease',
        margin: '20px 0', // Increased spacing
      }}
    >
      <Typography variant="h6" gutterBottom>
        Upload Your Document and Template Images
      </Typography>
      <Typography variant="body2" marginBottom={2}>
        Drag and drop your files here or click to select.
      </Typography>
      
      <Box marginY={2} display="flex" justifyContent="space-around" alignItems="center" gap={4}>
        <Box textAlign="center">
          {templateFile ? (
            renderImagePreview(templateFile, "template")
          ) : (
            <Button
              variant="contained"
              component="label"
              style={{ display: 'inline-flex' }}
            >
              Template Image
              <input
                type="file"
                hidden
                accept=".jpg,.jpeg,.png"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file && file.type.startsWith('image/')) {
                    setTemplateFile(file);
                  } else {
                    alert('Please select a valid image file for the template.');
                  }
                }} 
              />
            </Button>
          )}
        </Box>

        <Box textAlign="center">
          {documentFile ? (
            renderImagePreview(documentFile, "document")
          ) : (
            <Button
              variant="contained"
              component="label"
              style={{ display: 'inline-flex' }}
            >
              Document Image
              <input
                type="file"
                hidden
                accept=".jpg,.jpeg,.png"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file && file.type.startsWith('image/')) {
                    setDocumentFile(file);
                  } else {
                    alert('Please select a valid image file for the document.');
                  }
                }} 
              />
            </Button>
          )}
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" marginTop={2}>
  <Button 
    variant="contained" 
    color="primary" 
    onClick={handleUpload}
    disabled={!documentFile || !templateFile}
  >
    Validate Document
  </Button>
</Box>
      
    </motion.div>
  );
};

export default ImageUploader;