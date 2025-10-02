'use client';

interface FeedbackButtonsProps {
  feature: string;
  itemId: string;
}

export default function FeedbackButtons({ feature, itemId }: FeedbackButtonsProps) {
  const handleFeedback = (positive: boolean) => {
    // Simple feedback handling
    console.log(`Feedback for ${feature} ${itemId}: ${positive ? 'positive' : 'negative'}`);
  };

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={() => handleFeedback(true)}
        className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
      >
        👍
      </button>
      <button
        onClick={() => handleFeedback(false)}
        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
      >
        👎
      </button>
    </div>
  );
}