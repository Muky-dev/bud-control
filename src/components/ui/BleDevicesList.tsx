import type { FC } from "react";

import type { BleDeviceInfo } from "@/types/ble-device-info";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Progress,
} from "@heroui/react";

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
      <div>
        <Progress
          isIndeterminate={isLoading}
          hidden={!isLoading}
          className="rounded-lg"
          size="sm"
        />
      </div>
      <div className="flex w-full gap-2 flex-wrap">
        {devices ? (
          devices.map((device) => {
            return (
              <Card
                key={device.id}
                className="border border-gray-800 p-2 flex-1 rounded-lg bg-gray900"
              >
                <CardHeader>
                  <h3>{device.name}</h3>
                </CardHeader>
                <CardBody>
                  <p className="text-sm text-slate-400">ID: {device.id}</p>
                </CardBody>
                <CardFooter>
                  <div className="flex justify-end w-full">
                    <Button size="sm" variant="ghost">
                      Connect
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <p>No devices found</p>
        )}
      </div>
    </div>
  );
};
