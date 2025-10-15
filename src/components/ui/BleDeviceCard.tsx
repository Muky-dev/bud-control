import { Card, CardBody, CardHeader, Image } from "@heroui/react";

export const BleDeviceCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="w-full">
          <h2>QCY HT05</h2>
          <p>Status: disconnected</p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex justify-center">
          <Image
            isBlurred
            isZoomed
            alt="device_placeholder_image"
            src="src/assets/devices/qcy_ht05.webp"
            width={240}
          />
        </div>
      </CardBody>
    </Card>
  );
};
