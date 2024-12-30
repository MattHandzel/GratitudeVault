"use client"
import { useEffect, useState } from 'react'
import { theme } from '@/lib/theme'
import { Card, CardContent } from '@/components/ui/card'
import { Gratitude } from '@/lib/types'


// TODO: Gratitude history color is based on tag color
interface GratitudeHistoryProps {
  gratitudes: Gratitude[]
}

interface Stats {
  totalGratitudes: number
  totalDays: number
  averagePerDay: number
  currentStreak: number
  longestStreak: number
}

export function GratitudeHistory({ gratitudes }: GratitudeHistoryProps) {
  const [historyData, setHistoryData] = useState<number[][]>([])
  const [months, setMonths] = useState<string[]>([])
  const [stats, setStats] = useState<Stats>({
    totalGratitudes: 0,
    totalDays: 0,
    averagePerDay: 0,
    currentStreak: 0,
    longestStreak: 0,
  })
const endOfThisWeek = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilEndOfWeek = 6 - dayOfWeek; // Saturday is the 6th day of the week
  const endOfWeek = new Date(now);
  endOfWeek.setDate(now.getDate() + daysUntilEndOfWeek);
  endOfWeek.setHours(23, 59, 59, 999); // Set time to 11:59:59.999 pm
  return endOfWeek;
};

const endOfWeekDate = endOfThisWeek();

const getLocalDate = (timestamp) => {
  const localDate = new Date(timestamp);
  localDate.setHours(0, 0, 0, 0); // Normalize to midnight
  return localDate;
};
const today = getLocalDate(Date.now());
const todayWeekIndex = 0;
const todayDayIndex = Math.floor( today.getDay() );
console.log("today day index",todayDayIndex);


  useEffect(() => {

const activeGratitudes = gratitudes.filter(g => !g.archived);

console.log("end of week date",endOfWeekDate);
const now = endOfWeekDate;
const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
const data = Array(52).fill(0).map(() => Array(7).fill(0));
const monthLabels = [];
const daysWithGratitude = new Set();

// Helper to get the user's local date

// Calculate frequency data and gather days with gratitudes
activeGratitudes.forEach(gratitude => {
  const localDate = getLocalDate(gratitude.createdTimestamp);
  if (localDate >= oneYearAgo) {
    console.log(`We are looking at gratitude ${gratitude.title}`)
    const weekIndex = Math.floor((now - localDate) / (7 * 24 * 60 * 60 * 1000));
    const dayIndex = localDate.getDay(); // Sunday is 0, Saturday is 6
    if (weekIndex < 52) {
      console.log(`Gratitude on ${localDate.toISOString()} is added to week ${weekIndex} and day ${dayIndex}`);
      data[51 - weekIndex][dayIndex]++;
      daysWithGratitude.add(localDate.toISOString().split('T')[0]); // Store as ISO date string
    }
  }
});

// Sort and process streaks
const sortedDates = Array.from(daysWithGratitude)
  .map(date => new Date(date))
  .sort((a, b) => a - b);

for(let i = 0; i < sortedDates.length; i++) {
  console.log(`Date ${i}: ${sortedDates[i].toISOString()}`);
}

let currentStreak = 0;
let longestStreak = 0;
let tempStreak = 1;
const today = getLocalDate(Date.now());

// Calculate streaks
for (let i = 1; i < sortedDates.length; i++) {
  const currentDate = sortedDates[i];
  const previousDate = sortedDates[i - 1];
  const diffInDays = (currentDate - previousDate) / (24 * 60 * 60 * 1000);

  if (diffInDays === 1) {
    tempStreak++;
  } else {
    tempStreak = 1;
  }

  longestStreak = Math.max(longestStreak, tempStreak);
}

// Check for current streak
for (let i = sortedDates.length - 1; i >= 0; i--) {
  const streakDate = sortedDates[i];
  const diffFromToday = (today - streakDate) / (24 * 60 * 60 * 1000);

  if (diffFromToday === 0 || diffFromToday === 1) {
    currentStreak++;
  } else {
    break;
  }
}

// Generate month labels
const iDontWant13Months = 4;
for (let i = 0; i < 52 - iDontWant13Months; i++) {
  const date = new Date(now.getTime() - (51 - iDontWant13Months - i) * 7 * 24 * 60 * 60 * 1000);
  const monthName = date.toLocaleString('default', { month: 'short' });
  if (i === 0 || monthName !== monthLabels[monthLabels.length - 1]) {
    monthLabels.push(monthName);
  }
}

setHistoryData(data);
setMonths(monthLabels);
setStats({
  totalGratitudes: activeGratitudes.length,
  totalDays: daysWithGratitude.size,
  averagePerDay: daysWithGratitude.size > 0
    ? Number((activeGratitudes.length / daysWithGratitude.size).toFixed(1))
    : 0,
  currentStreak,
  longestStreak,
});
  }, [gratitudes])

  const getColor = (count: number, weekIndex:number, dayIndex:number) => {
    if (weekIndex==0 && dayIndex>todayDayIndex) return theme.colors.hide
    if (count === 0) return '#ebedf0'

    return theme.colors.accent + Math.min(20 + count * 40, 255).toString(16);
  }

  return (
    <Card className="p-6 bg-white overflow-x-auto">
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-semibold mb-2" style={{ color: theme.colors.text.primary }}>
            Gratitude History
          </h3>
          <div className="flex flex-wrap gap-6 text-sm mb-4" style={{ color: theme.colors.text.secondary }}>
            <div>
              <span className="font-semibold">{stats.totalGratitudes}</span> gratitudes written
            </div>
            <div>
              <span className="font-semibold">{stats.totalDays}</span> days of gratitude
            </div>
            <div>
              <span className="font-semibold">{stats.averagePerDay}</span> average per day
            </div>
            {/*<div>
              <span className="font-semibold">{stats.currentStreak}</span> day streak
            </div>
            <div>
              <span className="font-semibold">{stats.longestStreak}</span> day record
            </div>*/}
          </div>
        </div>
        
        <div className="relative">
          <div className="flex gap-1 mb-1 px-6">
            {months.map((month, index) => (
              <div
                key={index}
                className="text-xs"
                style={{
                  position: 'absolute',
                  left: `${(index * 102) / months.length + 1}%`,
                  transform: 'translateX(-50%)',
                  color: theme.colors.text.muted,
                }}
              >
                {month}
              </div>
            ))}
          </div>
          <div className="flex gap-1 w-full min-h-[160px] justify-between mt-6 md:w-auto">
            {historyData.map((week, weekIndex) => (

    ( 
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((count, dayIndex) => (
                  (!(weekIndex==51 && dayIndex>todayDayIndex))&&(<div
                    key={dayIndex}
                    className="w-4 h-4 transition-all duration-200 hover:scale-110"
                    style={{ 
                      backgroundColor: getColor(count, 51 - weekIndex, dayIndex),
                      borderRadius: theme.borderRadius.sm,
                    }}
                    title={`${count} gratitudes on ${new Date(endOfWeekDate - ((51 - weekIndex) * 7 + 6 - dayIndex) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}`}
                  />
                )))}
              </div>
            )))}
          </div>
          <div className="flex items-center justify-end gap-2" style={{ color: theme.colors.text.muted }}>
            <span className="text-sm">Less</span>
            {[0, 2, 4, 6].map((count) => (
              <div
                key={count}
                className="w-4 h-4"
                style={{ 
                  backgroundColor: getColor(count),
                  borderRadius: theme.borderRadius.sm,
                }}
              />
            ))}
            <span className="text-sm">More</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

