'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ProductUploadForm } from '@/features/products/ProductUploadForm';
import type { CreateProductForm } from '@/types/Marketplace';

export default function ProductUploadPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: CreateProductForm) => {
    setLoading(true);
    
    try {
      console.log('Uploading product:', data);
      
      // In a real app, you would:
      // 1. Upload files to cloud storage (AWS S3, Cloudinary, etc.)
      // 2. Create product record in database
      // 3. Process thumbnails and previews
      // 4. Send notification to admin for review (if needed)
      
      const formData = new FormData();
      
      // Add text fields
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('price', data.price.toString());
      formData.append('licenseType', data.licenseType);
      formData.append('tags', JSON.stringify(data.tags));
      
      if (data.shortDescription) {
        formData.append('shortDescription', data.shortDescription);
      }
      if (data.originalPrice) {
        formData.append('originalPrice', data.originalPrice.toString());
      }
      if (data.aiModel) {
        formData.append('aiModel', data.aiModel);
      }
      if (data.prompts) {
        formData.append('prompts', data.prompts);
      }
      
      // Add files
      formData.append('thumbnail', data.thumbnailFile);
      if (data.previewFile) {
        formData.append('preview', data.previewFile);
      }
      
      data.files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In a real app, you would make an API call like:
      // const response = await fetch('/api/products', {
      //   method: 'POST',
      //   body: formData,
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Upload failed');
      // }
      // 
      // const result = await response.json();
      
      console.log('Product uploaded successfully!');
      
      // Redirect to products page
      router.push('/dashboard/products');
      
    } catch (error) {
      console.error('Upload failed:', error);
      throw error; // Re-throw to let the form handle the error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ProductUploadForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}