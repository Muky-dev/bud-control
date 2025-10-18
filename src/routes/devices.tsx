import { BleDevicesList } from "@/components/ui/BleDevicesList";
import { useBluetoothDevices } from "@/hooks/useBluetoothDevices";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/devices")({
  component: RouteComponent,
});

function RouteComponent() {
  const { devices, loading: loadingDevices } = useBluetoothDevices({
    refetchIntervalMs: 10000,
  });

  return (
    <div className="p-4">
      <BleDevicesList devices={devices} isLoading={loadingDevices} />
    </div>
  );
}
