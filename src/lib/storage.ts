// Local storage utilities for SkillFlow

export interface UserData {
  selectedGoal: string | null;
  startDate: string | null;
}

export interface DailySession {
  date: string;
  goal: string;
  completed: boolean;
  completedItems: string[];
  durationMinutes: number;
}

export interface ProgressData {
  streakCount: number;
  totalDaysCompleted: number;
  completionPercentage: number;
  lastCompletedDate: string | null;
}

const STORAGE_KEYS = {
  USER: 'skillflow_user',
  SESSIONS: 'skillflow_sessions',
  PROGRESS: 'skillflow_progress',
};

export const getUser = (): UserData => {
  const data = localStorage.getItem(STORAGE_KEYS.USER);
  return data ? JSON.parse(data) : { selectedGoal: null, startDate: null };
};

export const setUser = (userData: UserData): void => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
};

export const getSessions = (): DailySession[] => {
  const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
  return data ? JSON.parse(data) : [];
};

export const addSession = (session: DailySession): void => {
  const sessions = getSessions();
  const existingIndex = sessions.findIndex(s => s.date === session.date);
  if (existingIndex >= 0) {
    sessions[existingIndex] = session;
  } else {
    sessions.push(session);
  }
  localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
};

export const getTodaySession = (): DailySession | null => {
  const today = new Date().toISOString().split('T')[0];
  const sessions = getSessions();
  return sessions.find(s => s.date === today) || null;
};

export const getProgress = (): ProgressData => {
  const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  return data ? JSON.parse(data) : {
    streakCount: 0,
    totalDaysCompleted: 0,
    completionPercentage: 0,
    lastCompletedDate: null,
  };
};

export const updateProgress = (progress: ProgressData): void => {
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
};

export const calculateStreak = (): number => {
  const sessions = getSessions().filter(s => s.completed);
  if (sessions.length === 0) return 0;

  const sortedSessions = sessions.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const lastSession = new Date(sortedSessions[0].date);
  lastSession.setHours(0, 0, 0, 0);

  // Check if last session was today or yesterday
  if (lastSession.getTime() !== today.getTime() && lastSession.getTime() !== yesterday.getTime()) {
    return 0;
  }

  let streak = 1;
  let currentDate = lastSession;

  for (let i = 1; i < sortedSessions.length; i++) {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    
    const sessionDate = new Date(sortedSessions[i].date);
    sessionDate.setHours(0, 0, 0, 0);

    if (sessionDate.getTime() === prevDate.getTime()) {
      streak++;
      currentDate = sessionDate;
    } else {
      break;
    }
  }

  return streak;
};

export const clearAllData = (): void => {
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.SESSIONS);
  localStorage.removeItem(STORAGE_KEYS.PROGRESS);
};
