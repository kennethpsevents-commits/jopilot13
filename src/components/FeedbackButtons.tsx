'use client';
import { useState } from 'react';

interface FeedbackButtonsProps {
  feature: string;
  itemId?: string;
  onFeedback?: (feedback: 'positive' | 'negative') => void;
}

export default function FeedbackButtons({ feature, itemId, onFeedback }: FeedbackButtonsProps) {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = async (type: 'positive' | 'negative') => {
    if (submitted) return;
    
    setFeedback(type);
    setSubmitted(true);

    try {
      // Send feedback to API
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'anonymous', // In real app, get from auth
          type: 'ai_feedback',
          value: type,
          context: {
            feature,
            itemId,
            timestamp: new Date().toISOString()
          }
        }),
      });

      if (response.ok) {
        console.log('Feedback submitted successfully');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }

    // Call parent callback if provided
    if (onFeedback) {
      onFeedback(type);
    }
  };

  if (submitted) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        padding: '8px 12px',
        background: feedback === 'positive' ? '#D1FAE5' : '#FEE2E2',
        borderRadius: '6px',
        fontSize: '14px',
        color: feedback === 'positive' ? '#065F46' : '#991B1B'
      }}>
        <span>{feedback === 'positive' ? '👍' : '👎'}</span>
        <span>Bedankt voor je feedback!</span>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px',
      padding: '8px 12px',
      background: '#F9FAFB',
      borderRadius: '6px',
      border: '1px solid #E5E7EB'
    }}>
      <span style={{ fontSize: '14px', color: '#6B7280' }}>Was dit nuttig?</span>
      <button
        onClick={() => handleFeedback('positive')}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '18px',
          cursor: 'pointer',
          padding: '4px',
          borderRadius: '4px',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#D1FAE5';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        title="Positief"
      >
        👍
      </button>
      <button
        onClick={() => handleFeedback('negative')}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '18px',
          cursor: 'pointer',
          padding: '4px',
          borderRadius: '4px',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#FEE2E2';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        title="Negatief"
      >
        👎
      </button>
    </div>
  );
}

