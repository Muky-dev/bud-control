import type { BleCharacteristicInfo } from "./ble-characteristic-info";

export interface BleServiceInfo {
  uuid: string;
  characteristics: BleCharacteristicInfo[];
}
