"use client"
import { useEffect, useState } from 'react'
import { theme } from '@/lib/theme'
import { Card, CardContent } from '@/components/ui/card'

interface GratitudeFrequencyProps {
  gratitudes: Array<{ createdTimestamp: string; archived?: boolean }>
}

interface Stats {
  totalGratitudes: number
  totalDays: number
  averagePerDay: number
  currentStreak: number
  longestStreak: number
}

export function GratitudeFrequency({ gratitudes }: GratitudeFrequencyProps) {
  const [frequencyData, setFrequencyData] = useState<number[][]>([])
  const [months, setMonths] = useState<string[]>([])
  const [stats, setStats] = useState<Stats>({
    totalGratitudes: 0,
    totalDays: 0,
    averagePerDay: 0,
    currentStreak: 0,
    longestStreak: 0,
  })

  useEffect(() => {
    const activeGratitudes = gratitudes.filter(g => !g.archived)
    const now = new Date()
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
    const data: number[][] = Array(52).fill(0).map(() => Array(7).fill(0))
    const monthLabels: string[] = []
    const daysWithGratitude = new Set<string>()
    
    // Calculate frequency data and gather days with gratitudes
    activeGratitudes.forEach(gratitude => {
      const date = new Date(gratitude.createdTimestamp)
      if (date >= oneYearAgo) {
        const weekIndex = Math.floor((now.getTime() - date.getTime()) / (7 * 24 * 60 * 60 * 1000))
        const dayIndex = date.getDay()
        if (weekIndex < 52) {
          data[51 - weekIndex][dayIndex]++
          daysWithGratitude.add(date.toISOString().split('T')[0])
        }
      }
    })

    // Calculate stats
    
const sortedDates = Array.from(daysWithGratitude)
  .map(date => new Date(date))
  .sort((a, b) => a - b);

let currentStreak = 0;
let longestStreak = 0;
let tempStreak = 1; // Initialize to 1 since a single day is a streak

const today = new Date();
today.setHours(0, 0, 0, 0); // Normalize today to midnight

// Calculate streaks
for (let i = 1; i < sortedDates.length; i++) {
  const currentDate = sortedDates[i];
  const previousDate = sortedDates[i - 1];

  const diffInDays = (currentDate - previousDate) / (24 * 60 * 60 * 1000);

  if (diffInDays === 1) {
    tempStreak++;
  } else {
    tempStreak = 1; // Reset streak if not consecutive
  }

  if (tempStreak > longestStreak) {
    longestStreak = tempStreak;
  }
}

// Check for current streak
for (let i = sortedDates.length - 1; i >= 0; i--) {
  const streakDate = sortedDates[i];
  const diffFromToday = (today - streakDate) / (24 * 60 * 60 * 1000);

  if (diffFromToday === 0 || diffFromToday === 1) {
    currentStreak++;
  } else {
    break; // Stop checking once the streak breaks
  }
}

    const iDontWant13Months = 4
    // Generate month labels
    for (let i = 0; i < 52 - iDontWant13Months; i++) {
      const date = new Date(now.getTime() - (51 - iDontWant13Months - i) * 7 * 24 * 60 * 60 * 1000)
      const monthName = date.toLocaleString('default', { month: 'short' })
      if (i === 0 || monthName !== monthLabels[monthLabels.length - 1]) {
        monthLabels.push(monthName)
      }
    }

    setFrequencyData(data)
    setMonths(monthLabels)
    setStats({
      totalGratitudes: activeGratitudes.length,
      totalDays: daysWithGratitude.size,
      averagePerDay: daysWithGratitude.size > 0 
        ? Number((activeGratitudes.length / daysWithGratitude.size).toFixed(1))
        : 0,
      currentStreak,
      longestStreak,
    })
  }, [gratitudes])

  const getColor = (count: number) => {
    if (count === 0) return '#ebedf0'
    if (count < 3) return theme.colors.accent + '40'
    if (count < 5) return theme.colors.accent + '80'
    return theme.colors.accent
  }

  return (
    <Card className="p-6 bg-white">
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
            <div>
              <span className="font-semibold">{stats.currentStreak}</span> day streak
            </div>
            <div>
              <span className="font-semibold">{stats.longestStreak}</span> day record
            </div>
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
          <div className="flex gap-1 w-full min-h-[160px] justify-between mt-6">
            {frequencyData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((count, dayIndex) => (
                  <div
                    key={dayIndex}
                    className="w-4 h-4 transition-all duration-200 hover:scale-110"
                    style={{ 
                      backgroundColor: getColor(count),
                      borderRadius: theme.borderRadius.sm,
                    }}
                    title={`${count} gratitudes on ${new Date(Date.now() - ((51 - weekIndex) * 7 + dayIndex) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}`}
                  />
                ))}
              </div>
            ))}
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

