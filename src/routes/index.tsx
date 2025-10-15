import { BudModesRadioGroup } from "@/components/ui/BudModesRadioGroup";
import { BleDeviceCard } from "@/components/ui/BleDeviceCard";
import { createFileRoute } from "@tanstack/react-router";
import { useBluetoothDevices } from "@/hooks/useBluetoothDevices";
import { BleDevicesList } from "@/components/ui/BleDevicesList";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { devices, loading: loadingDevices } = useBluetoothDevices({
    refetchIntervalMs: 10000,
  });

  return (
    <div className="flex flex-col p-4 gap-4 min-h-full justify-between">
      <BleDevicesList devices={devices} isLoading={loadingDevices} />
      <BleDeviceCard />
      <BudModesRadioGroup />
    </div>
  );
}
