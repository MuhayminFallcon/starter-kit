import { Box, Typography, ImageList, ImageListItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { Edit } from '@mui/icons-material';
import { uploadImage } from '@/utils/imageUploader'; // Ensure the path is correct

type ProductListProps = {
  products?: string[];
  isMobile: boolean;
  onProductsChange?: (newProducts: string[]) => void;
};

const ProductList = ({ products = [], isMobile, onProductsChange }: ProductListProps) => {
  const [editableProducts, setEditableProducts] = useState(products);
  const [localImages, setLocalImages] = useState(products);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Placeholder images
  const placeholderProducts = [
    '/path/to/placeholder/image1.jpg', // Replace with actual placeholder image paths
    '/path/to/placeholder/image2.jpg',
    '/path/to/placeholder/image3.jpg',
    '/path/to/placeholder/image4.jpg',
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).map(file => URL.createObjectURL(file));
      setSelectedFiles(fileArray);

      const newLocalImages = Array.from(files).map(file => URL.createObjectURL(file));
      setLocalImages(newLocalImages);

      const newEditableProducts = Array.from(files).map(file => URL.createObjectURL(file));
      setEditableProducts(newEditableProducts);

      setIsDialogOpen(true);
    }
  };

  return (
    <Box className="productContainer" p={2} mt={4} direction="rtl" sx={{ direction: 'rtl' }}>
      <Typography variant="h5" component="h3" gutterBottom textAlign="right">
        منتجاتنا
      </Typography>
      <ImageList cols={isMobile ? 2 : 3} gap={16}>
        {(editableProducts.length > 0 ? editableProducts : placeholderProducts).map((product, index) => (
          <ImageListItem key={index} className="product-item">
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingBottom: '100%',
                overflow: 'hidden',
              }}
            >
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
              />
              <Image
                id={`productImage${index}`}
                src={localImages[index] || product}
                alt={`Product ${index + 1}`}
                layout="fill"
                objectFit="cover"
                loading="lazy"
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer"
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  left: 8, // Changed to left for RTL
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  },
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <Edit />
              </IconButton>
            </Box>
          </ImageListItem>
        ))}
      </ImageList>

      {/* Dialog to display selected images */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="lg" fullWidth>
        <DialogTitle>Selected Images</DialogTitle>
        <DialogContent>
          <ImageList cols={3} gap={16}>
            {selectedFiles.map((file, index) => (
              <ImageListItem key={index}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={file}
                    alt={`Selected ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    loading="lazy"
                  />
                </Box>
              </ImageListItem>
            ))}
          </ImageList>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductList;
