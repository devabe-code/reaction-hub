"use client";

import { Switch } from "@nextui-org/switch";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = useState((theme === 'light'))

  const handleValueChange = (value: boolean) => {
    setIsSelected(value);
    if (value) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div>
      <Switch
        defaultSelected
        size="lg"
        color="warning"
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
        isSelected={isSelected}
        onValueChange={handleValueChange}
      />
    </div>
  )
};