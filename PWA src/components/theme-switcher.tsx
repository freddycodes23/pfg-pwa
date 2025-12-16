
"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = React.useState(theme === 'dark');

  React.useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);

  const toggleTheme = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
    setIsDarkMode(checked);
  }

  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
            <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
            <p className="text-sm text-muted-foreground">
                Toggle to switch between light and dark themes.
            </p>
        </div>
        <Switch
            id="dark-mode"
            checked={isDarkMode}
            onCheckedChange={toggleTheme}
        />
    </div>
  )
}
