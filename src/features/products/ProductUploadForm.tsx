'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type ProductUploadFormProps = {
  onSubmit: (data: any) => void;
  loading?: boolean;
};

export function ProductUploadForm({ onSubmit, loading = false }: ProductUploadFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'ai_video',
    tags: '',
    file: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, file });
  };

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>Upload New Product</CardTitle>
        <CardDescription>
          Share your AI creation with the ZENO community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Product Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter a catchy title for your AI product"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your AI product, its features, and use cases"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                required
              >
                <option value="ai_video">AI Video</option>
                <option value="ai_music">AI Music</option>
                <option value="ai_image">AI Image</option>
                <option value="ai_tool">AI Tool</option>
                <option value="ai_book">AI Book</option>
                <option value="ai_voice">AI Voice</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={e => setFormData({ ...formData, tags: e.target.value })}
              placeholder="ai, video, music, creative (comma separated)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Product File</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              accept=".mp4,.mp3,.jpg,.jpeg,.png,.pdf,.zip"
              required
            />
            <p className="text-sm text-muted-foreground">
              Supported formats: MP4, MP3, JPG, PNG, PDF, ZIP (max 100MB)
            </p>
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload Product'}
            </Button>
            <Button type="button" variant="outline" className="flex-1" disabled={loading}>
              Save as Draft
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
