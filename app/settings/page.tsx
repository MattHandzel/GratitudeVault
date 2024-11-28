//'use client'
//
////import { useState, useEffect } from 'react'
//import { useSession } from 'next-auth/react'
//import { useRouter } from 'next/navigation'
//import { Button } from '@/components/ui/button'
//import { Switch } from '@/components/ui/switch'
//import { Label } from '@/components/ui/label'
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
//import { useToast } from '@/hooks/use-toast'
//import { updateUserSettings } from '@/app/actions/updateUserSettings'
//
//export default function SettingsPage() {
//  const [theme, setTheme] = useState('light')
//  const [soundEnabled, setSoundEnabled] = useState(false)
//  const { data: session, status } = useSession()
//  const router = useRouter()
//  const { toast } = useToast()
//
//  //useEffect(() => {
//  //  if (status === 'unauthenticated') {
//  //    router.push('/auth/signin')
//  //  } else if (status === 'authenticated') {
//  //    // Fetch user settings from the database
//  //    // This is a placeholder, you'll need to implement the actual fetching logic
//  //    setTheme('light')
//  //    setSoundEnabled(false)
//  //  }
//  //}, [status, router])
//
//  const handleSaveSettings = async () => {
//    if (session?.user?.email) {
//      try {
//        await updateUserSettings(session.user.email, { theme, soundEnabled })
//        toast({
//          title: "Settings Saved",
//          description: "Your preferences have been updated.",
//        })
//      } catch (error) {
//        toast({
//          title: "Error",
//          description: "There was an error saving your settings. Please try again.",
//          variant: "destructive",
//        })
//      }
//    }
//  }
//
//  if (status === 'loading') {
//    return <div>Loading...</div>
//  }
//
//  if (!session) {
//    return null
//  }
//
//  return (
//    <div className="container mx-auto px-4 py-8 animate-fade-up">
//      <h1 className="text-3xl font-bold mb-6">Settings</h1>
//      <div className="space-y-6">
//        <div>
//          <Label htmlFor="theme">Theme</Label>
//          <Select value={theme} onValueChange={setTheme}>
//            <SelectTrigger className="w-full">
//              <SelectValue placeholder="Select a theme" />
//            </SelectTrigger>
//            <SelectContent>
//              <SelectItem value="light">Light</SelectItem>
//              <SelectItem value="dark">Dark</SelectItem>
//              <SelectItem value="system">System</SelectItem>
//            </SelectContent>
//          </Select>
//        </div>
//        <div className="flex items-center space-x-2">
//          <Switch
//            id="sound-effects"
//            checked={soundEnabled}
//            onCheckedChange={setSoundEnabled}
//          />
//          <Label htmlFor="sound-effects">Enable sound effects</Label>
//        </div>
//        <Button onClick={handleSaveSettings} className="animate-scale-up">Save Settings</Button>
//      </div>
//    </div>
//  )
//}
//
//
//
export default function SettingsPage() {
  // temp

  return <div>Settings</div>;
}
