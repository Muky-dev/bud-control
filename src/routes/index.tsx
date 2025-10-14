import { useEffect } from "react";
import { BudModesRadioGroup } from "@/components/ui/BudModesRadioGroup";
import { DeviceCard } from "@/components/ui/DeviceCard";
import { createFileRoute } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api/core";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useEffect(() => {
    invoke("discover_audio_devices");
  }, []);
  return (
    <div className="flex flex-col p-4 gap-4 min-h-full justify-between">
      <DeviceCard />
      <BudModesRadioGroup />
    </div>
  );
}
