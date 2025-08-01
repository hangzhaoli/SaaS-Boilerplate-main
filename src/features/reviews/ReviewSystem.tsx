'use client';

import { useState } from 'react';
import { 
  Star, 
  ThumbsUp, 
  MessageSquare, 
  MoreHorizontal, 
  Flag,
  Plus
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

import type { ReviewWithDetails, CreateReviewForm } from '@/types/Marketplace';

interface ReviewSystemProps {
  productId: number;
  reviews: ReviewWithDetails[];
  averageRating: number;
  totalReviews: number;
  canReview?: boolean;
  onSubmitReview?: (review: CreateReviewForm) => Promise<void>;
  onHelpfulVote?: (reviewId: number) => void;
  onReportReview?: (reviewId: number) => void;
  loading?: boolean;
}

interface ReviewFormData {
  rating: number;
  title: string;
  comment: string;
}

export function ReviewSystem({ 
  productId,
  reviews, 
  averageRating, 
  totalReviews,
  canReview = false,
  onSubmitReview, 
  onHelpfulVote, 
  onReportReview,
  loading = false 
}: ReviewSystemProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 5,
    title: '',
    comment: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(review => review.rating === rating).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { rating, count, percentage };
  });

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmitReview) return;

    setSubmitting(true);
    try {
      await onSubmitReview({
        productId,
        rating: formData.rating,
        title: formData.title.trim() || undefined,
        comment: formData.comment.trim() || undefined,
      });
      
      // Reset form
      setFormData({ rating: 5, title: '', comment: '' });
      setShowReviewForm(false);
    } catch (error) {
      console.error('Failed to submit review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(date));
  };

  const renderStars = (rating: number, interactive = false, onChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            onClick={() => interactive && onChange?.(star)}
            disabled={!interactive}
          >
            <Star
              className={`h-4 w-4 ${
                star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-card border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <span className="text-4xl font-bold">{averageRating.toFixed(1)}</span>
              <div>
                {renderStars(Math.round(averageRating))}
                <p className="text-sm text-muted-foreground mt-1">
                  Based on {totalReviews} reviews
                </p>
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1 w-12">
                  <span>{rating}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right text-muted-foreground">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review Button */}
        {canReview && (
          <div className="mt-6 pt-6 border-t">
            <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Write a Review
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Write a Review</DialogTitle>
                  <DialogDescription>
                    Share your experience with this product
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Rating */}
                  <div>
                    <Label>Rating</Label>
                    <div className="mt-2">
                      {renderStars(formData.rating, true, (rating) => 
                        setFormData(prev => ({ ...prev, rating }))
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <Label htmlFor="review-title">Title (Optional)</Label>
                    <Input
                      id="review-title"
                      placeholder="Summary of your review"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      maxLength={100}
                    />
                  </div>

                  {/* Comment */}
                  <div>
                    <Label htmlFor="review-comment">Review (Optional)</Label>
                    <textarea
                      id="review-comment"
                      className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell others about your experience with this product"
                      value={formData.comment}
                      onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                      maxLength={1000}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.comment.length}/1000 characters
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowReviewForm(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={submitting}
                      className="flex-1"
                    >
                      {submitting ? 'Submitting...' : 'Submit Review'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-card border rounded-lg p-6 animate-pulse">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-muted rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4" />
                  <div className="h-3 bg-muted rounded w-1/6" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-16 bg-muted rounded" />
                </div>
              </div>
            </div>
          ))
        ) : reviews.length === 0 ? (
          <div className="bg-card border rounded-lg p-12 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium mb-2">No reviews yet</h4>
            <p className="text-muted-foreground">
              {canReview ? 'Be the first to review this product!' : 'Check back later for reviews from other customers.'}
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-card border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                    {(review.buyer?.displayName || 'A')[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">
                        {review.buyer?.displayName || 'Anonymous'}
                      </span>
                      {review.isVerifiedPurchase && (
                        <Badge variant="outline" className="text-xs">
                          ✓ Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {renderStars(review.rating)}
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onReportReview?.(review.id)}>
                      <Flag className="h-4 w-4 mr-2" />
                      Report Review
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Review Title */}
              {review.title && (
                <h4 className="font-medium mb-2">{review.title}</h4>
              )}

              {/* Review Comment */}
              {review.comment && (
                <p className="text-muted-foreground mb-4 whitespace-pre-wrap">
                  {review.comment}
                </p>
              )}

              {/* Seller Response */}
              {review.sellerResponse && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-sm">Seller Response</span>
                    <span className="text-xs text-muted-foreground">
                      {review.sellerResponseAt && formatDate(review.sellerResponseAt)}
                    </span>
                  </div>
                  <p className="text-sm">{review.sellerResponse}</p>
                </div>
              )}

              {/* Review Actions */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onHelpfulVote?.(review.id)}
                  className="gap-1 text-muted-foreground hover:text-foreground"
                >
                  <ThumbsUp className="h-4 w-4" />
                  Helpful ({review.isHelpful})
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More Reviews */}
      {reviews.length > 0 && !loading && (
        <div className="text-center">
          <Button variant="outline">
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
}