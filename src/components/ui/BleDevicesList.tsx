import type { FC } from "react";

import type { BleDeviceInfo } from "@/types/ble-device-info";
import { Progress } from "@heroui/react";

interface BleDevicesListProps {
  devices: BleDeviceInfo[];
  isLoading?: boolean;
}

export const BleDevicesList: FC<BleDevicesListProps> = ({
  devices,
  isLoading,
}) => {
  return (
    <div className="rounded-lg bg-slate-950 flex flex-col gap-2">
      {isLoading && (
        <Progress
          isIndeterminate={isLoading}
          className="rounded-lg"
          size="sm"
        />
      )}
      {devices ? (
        devices.map((device) => {
          return (
            <div key={device.id} className="border p-2 rounded-lg bg-slate-900">
              <h3>{device.name}</h3>
            </div>
          );
        })
      ) : (
        <p>No devices found</p>
      )}
    </div>
  );
};
