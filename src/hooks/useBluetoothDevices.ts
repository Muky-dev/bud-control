import { useCallback } from "react";
import { invoke } from "@tauri-apps/api/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { BleDeviceInfo } from "@/types/ble-device-info";
import type { BleServiceInfo } from "@/types/ble-service-info";

export interface UseBluetoothDevicesOptions {
  refetchIntervalMs?: number;
  enabled?: boolean;
}

export const useBluetoothDevices = (
  options: UseBluetoothDevicesOptions = {},
) => {
  const { refetchIntervalMs = 8000, enabled = true } = options;
  const queryClient = useQueryClient();

  const devicesQuery = useQuery<BleDeviceInfo[], Error>({
    queryKey: ["bluetooth", "devices"],
    queryFn: async () => invoke<BleDeviceInfo[]>("discover_audio_devices"),
    refetchInterval: enabled ? refetchIntervalMs : false,
    enabled,
  });

  const getServices = useCallback(
    async (deviceId: string) => {
      return queryClient.fetchQuery<BleServiceInfo[], Error>({
        queryKey: ["bluetooth", "devices", deviceId, "services"],
        queryFn: async () =>
          invoke<BleServiceInfo[]>("retrieve_services_and_characteristics", {
            deviceId,
          }),
      });
    },
    [queryClient],
  );

  return {
    devices: devicesQuery.data ?? [],
    loading: devicesQuery.isLoading || devicesQuery.isFetching,
    error: devicesQuery.error?.message ?? null,
    refresh: () => devicesQuery.refetch(),
    getServices,
    query: devicesQuery,
  };
};
