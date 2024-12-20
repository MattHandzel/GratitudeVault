'use client'

import { signIn } from 'next-auth/react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { theme } from '@/lib/theme'

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    dailyReminder: true,
    reminderTime: '20:00',
    darkMode: false,
    publicByDefault: false
  })

  const router = useRouter()

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle style={{ color: theme.colors.text.primary }}>Settings</DialogTitle>
          <DialogDescription style={{ color: theme.colors.text.secondary }}>
            Customize your Gratitude Vault experience
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="flex flex-col">
              <span style={{ color: theme.colors.text.primary }}>Email Notifications</span>
              <span className="text-sm" style={{ color: theme.colors.text.secondary }}>
                Receive notifications about your gratitude practice
              </span>
            </Label>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="daily-reminder" className="flex flex-col">
              <span style={{ color: theme.colors.text.primary }}>Daily Reminder</span>
              <span className="text-sm" style={{ color: theme.colors.text.secondary }}>
                Get reminded to write your daily gratitude
              </span>
            </Label>
            <Switch
              id="daily-reminder"
              checked={settings.dailyReminder}
              onCheckedChange={(checked) => handleSettingChange('dailyReminder', checked)}
            />
          </div>

          {settings.dailyReminder && (
            <div className="flex items-center justify-between">
              <Label htmlFor="reminder-time" className="flex flex-col">
                <span style={{ color: theme.colors.text.primary }}>Reminder Time</span>
                <span className="text-sm" style={{ color: theme.colors.text.secondary }}>
                  When should we remind you?
                </span>
              </Label>
              <Input
                id="reminder-time"
                type="time"
                value={settings.reminderTime}
                onChange={(e) => handleSettingChange('reminderTime', e.target.value)}
                className="w-24"
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode" className="flex flex-col">
              <span style={{ color: theme.colors.text.primary }}>Dark Mode</span>
              <span className="text-sm" style={{ color: theme.colors.text.secondary }}>
                Enable dark mode for better night viewing
              </span>
            </Label>
            <Switch
              id="dark-mode"
              checked={settings.darkMode}
              onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="public-default" className="flex flex-col">
              <span style={{ color: theme.colors.text.primary }}>Public by Default</span>
              <span className="text-sm" style={{ color: theme.colors.text.secondary }}>
                Make new gratitudes public by default
              </span>
            </Label>
            <Switch
              id="public-default"
              checked={settings.publicByDefault}
              onCheckedChange={(checked) => handleSettingChange('publicByDefault', checked)}
            />
          </div>

          <div className="pt-4 flex justify-between">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => signIn('google', { callbackUrl: '/vault' })}
              variant="outline"
              className="w-full mb-4"
            >
              Account
            </Button>
            <Button onClick={() => onOpenChange(false)}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

