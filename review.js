import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Emily Johnson",
    date: "January 15, 2025",
    rating: 5,
    review: "This platform has been a game-changer for me! I love how easy it is to track my periods and moods, and the postpartum resources are incredibly helpful. Highly recommend!"
  },
  {
    name: "Sophia Lee",
    date: "February 1, 2025",
    rating: 4,
    review: "Beautiful design and intuitive features. It really helps me stay on top of my health. I just wish there were more mood tracking options!"
  },
  {
    name: "Olivia Patel",
    date: "January 22, 2025",
    rating: 5,
    review: "This website has made my postpartum journey so much smoother. The tips and mood tracking are exactly what I needed. Thank you!"
  }
];

const ReviewCard = ({ name, date, rating, review }) => {
  return (
    <div className="bg-pink-100 rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-pink-700">{name}</h3>
        <p className="text-sm text-pink-500">{date}</p>
      </div>
      <div className="flex items-center mb-4">
        {Array.from({ length: rating }).map((_, index) => (
          <Star key={index} className="text-pink-500 w-5 h-5" />
        ))}
      </div>
      <p className="text-pink-700">{review}</p>
    </div>
  );
};

const ReviewsSection = () => {
  return (
    <section className="bg-pink-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-pink-600 text-center mb-10">What Our Users Say</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
