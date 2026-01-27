// Audio content data for each learning goal

export interface AudioItem {
  id: string;
  title: string;
  artist: string;
  duration: string;
  durationMinutes: number;
  type: 'song' | 'podcast' | 'lesson';
  description: string;
  spotifyUrl: string;
}

export interface GoalContent {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  audioItems: AudioItem[];
  totalDuration: number;
}

export const goals: GoalContent[] = [
  {
    id: 'english-vocabulary',
    title: 'Improve English Vocabulary',
    description: 'Expand your vocabulary through curated songs and podcasts with rich, expressive language',
    icon: '📚',
    color: 'from-emerald-500 to-teal-600',
    totalDuration: 18,
    audioItems: [
      {
        id: 'ev-1',
        title: 'Vocabulary Builder: Word Power',
        artist: 'English Learning Podcast',
        duration: '4:30',
        durationMinutes: 4.5,
        type: 'lesson',
        description: 'Learn 10 advanced words with context and usage examples',
        spotifyUrl: 'https://open.spotify.com/track/example1',
      },
      {
        id: 'ev-2',
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        duration: '3:53',
        durationMinutes: 3.9,
        type: 'song',
        description: 'Practice listening comprehension with modern vocabulary',
        spotifyUrl: 'https://open.spotify.com/track/example2',
      },
      {
        id: 'ev-3',
        title: 'Thinking Out Loud',
        artist: 'Ed Sheeran',
        duration: '4:41',
        durationMinutes: 4.7,
        type: 'song',
        description: 'Romantic expressions and idiomatic phrases',
        spotifyUrl: 'https://open.spotify.com/track/example3',
      },
      {
        id: 'ev-4',
        title: 'Someone Like You',
        artist: 'Adele',
        duration: '4:45',
        durationMinutes: 4.8,
        type: 'song',
        description: 'Emotional vocabulary and past tense usage',
        spotifyUrl: 'https://open.spotify.com/track/example4',
      },
    ],
  },
  {
    id: 'public-speaking',
    title: 'Practice Public Speaking',
    description: 'Build confidence and learn techniques from master speakers and performers',
    icon: '🎤',
    color: 'from-violet-500 to-purple-600',
    totalDuration: 17,
    audioItems: [
      {
        id: 'ps-1',
        title: 'The Art of Public Speaking',
        artist: 'TED Talks Daily',
        duration: '5:00',
        durationMinutes: 5,
        type: 'podcast',
        description: 'Essential techniques for commanding any room',
        spotifyUrl: 'https://open.spotify.com/track/example5',
      },
      {
        id: 'ps-2',
        title: 'Confident',
        artist: 'Demi Lovato',
        duration: '3:25',
        durationMinutes: 3.4,
        type: 'song',
        description: 'Internalize confidence through powerful lyrics',
        spotifyUrl: 'https://open.spotify.com/track/example6',
      },
      {
        id: 'ps-3',
        title: 'Roar',
        artist: 'Katy Perry',
        duration: '3:42',
        durationMinutes: 3.7,
        type: 'song',
        description: 'Empowerment anthem for speaking up',
        spotifyUrl: 'https://open.spotify.com/track/example7',
      },
      {
        id: 'ps-4',
        title: 'Stronger',
        artist: 'Kelly Clarkson',
        duration: '3:42',
        durationMinutes: 3.7,
        type: 'song',
        description: 'Build mental resilience for presentations',
        spotifyUrl: 'https://open.spotify.com/track/example8',
      },
    ],
  },
  {
    id: 'focus-work',
    title: 'Improve Focus While Working',
    description: 'Enhance concentration with scientifically curated audio for deep work sessions',
    icon: '🧠',
    color: 'from-amber-500 to-orange-600',
    totalDuration: 20,
    audioItems: [
      {
        id: 'fw-1',
        title: 'Focus Flow: Deep Work Techniques',
        artist: 'Productivity Podcast',
        duration: '4:00',
        durationMinutes: 4,
        type: 'lesson',
        description: 'Learn the science of sustained attention',
        spotifyUrl: 'https://open.spotify.com/track/example9',
      },
      {
        id: 'fw-2',
        title: 'Weightless',
        artist: 'Marconi Union',
        duration: '4:00',
        durationMinutes: 4,
        type: 'song',
        description: 'Scientifically designed to reduce anxiety by 65%',
        spotifyUrl: 'https://open.spotify.com/track/example10',
      },
      {
        id: 'fw-3',
        title: 'Clair de Lune',
        artist: 'Debussy',
        duration: '5:00',
        durationMinutes: 5,
        type: 'song',
        description: 'Classical piece proven to enhance focus',
        spotifyUrl: 'https://open.spotify.com/track/example11',
      },
      {
        id: 'fw-4',
        title: 'Experience',
        artist: 'Ludovico Einaudi',
        duration: '5:15',
        durationMinutes: 5.25,
        type: 'song',
        description: 'Instrumental piece for flow state activation',
        spotifyUrl: 'https://open.spotify.com/track/example12',
      },
      {
        id: 'fw-5',
        title: 'River Flows in You',
        artist: 'Yiruma',
        duration: '3:30',
        durationMinutes: 3.5,
        type: 'song',
        description: 'Gentle piano for sustained concentration',
        spotifyUrl: 'https://open.spotify.com/track/example13',
      },
    ],
  },
];

export const getGoalById = (id: string): GoalContent | undefined => {
  return goals.find(g => g.id === id);
};

export const motivationalMessages = [
  "Amazing work! Your brain is getting stronger every day. 🧠",
  "Consistency is key, and you're crushing it! Keep going! 💪",
  "15 minutes closer to mastery. That's real progress! 🚀",
  "You showed up for yourself today. That takes strength! ⭐",
  "Every session builds new neural pathways. You're literally evolving! 🌱",
  "Dedication like yours is rare. Be proud of yourself! 🏆",
  "Another day, another step toward your goals. Unstoppable! 🔥",
  "Learning is a journey, and you're on the right path! 🛤️",
];

export const getRandomMotivation = (): string => {
  return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
};
