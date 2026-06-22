export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface City {
  id: string;
  name: string;
  population: string;
  region: string;
  image: string;
  description: string;
  history: string;
  economy: string;
  universities: string[];
  landmarks: string[];
  traditions: string[];
  heroes: string[];
  poets: string[];
  foods: string[];
  dialectWords: string[];
  facts: string[];
  quiz: Quiz[];
}

export interface UserProgress {
  viewedCities: string[];
  completedQuizzes: string[];
  totalXP: number;
  achievements: string[];
}