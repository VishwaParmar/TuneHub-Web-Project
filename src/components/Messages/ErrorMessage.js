// Author: Kainat Khan
// Date: July 24, 2023
import { Alert, AlertDescription, AlertIcon, Box } from '@chakra-ui/react';
import React from 'react';
export default function ErrorMessage({ message }) {
  return (
    <Box my={4}>
      <Alert status="error" borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Box>
  );
}