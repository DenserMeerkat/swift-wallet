"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, MonitorSmartphone } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

const ThemeButtons = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const ToggleButton = (props: any) => {
    const themeName = props.themeName;
    const isActive = props.isActive ?? false;
    const Icon = props.Icon;
    return (
      <Toggle
        className="group rounded-full data-[state=on]:bg-muted"
        size={"xs"}
        aria-label={`${themeName} Theme Toggle`}
        pressed={isActive}
        onPressedChange={(value) => {
          setTheme(themeName.toLowerCase());
        }}
      >
        <Icon className="h-4 w-5 group-data-[state=on]:text-primary" />
      </Toggle>
    );
  };

  const renderThemeChanger = () => {
    if (!mounted) {
      return (
        <div className="flex rounded-full border p-0.5 sm:gap-0.5 sm:p-1">
          <ToggleButton themeName="Light" Icon={Sun} />
          <ToggleButton themeName="System" Icon={MonitorSmartphone} />
          <ToggleButton themeName="Dark" Icon={Moon} />
        </div>
      );
    }
    return (
      <div className="flex rounded-full border p-0.5 sm:gap-0.5 sm:p-1">
        <ToggleButton
          themeName="Light"
          Icon={Sun}
          isActive={theme === "light"}
        />
        <ToggleButton
          themeName="System"
          Icon={MonitorSmartphone}
          isActive={theme === "system"}
        />
        <ToggleButton
          themeName="Dark"
          Icon={Moon}
          isActive={theme === "dark"}
        />
      </div>
    );
  };

  return <div>{renderThemeChanger()}</div>;
};

export default ThemeButtons;
