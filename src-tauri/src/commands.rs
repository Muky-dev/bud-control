use btleplug::api::{Central, Manager, Peripheral, ScanFilter};
use btleplug::platform::Manager as PlatformManager;
use serde::Serialize;
use std::time::Duration;
use tokio::time;

#[derive(Debug, Serialize)]
pub struct DeviceInfo {
    pub id: String,
    pub name: String,
    pub address: String,
    pub manufacturer_data: serde_json::Value,
}

#[derive(Debug, Serialize)]
pub struct CharacteristicInfo {
    pub uuid: String,
    pub properties: Vec<String>,
}

#[derive(Debug, Serialize)]
pub struct ServiceInfo {
    pub uuid: String,
    pub characteristics: Vec<CharacteristicInfo>,
}

#[tauri::command]
pub fn trigger_default_audio_mode() {
    println!("Triggering default audio profile...");
}

#[tauri::command]
pub fn trigger_anc_audio_mode() {
    println!("Triggering active noise cancellation...");
}

#[tauri::command]
pub fn trigger_transparency_audio_mode() {
    println!("Triggering transparency mode...");
}

#[tauri::command]
pub async fn discover_audio_devices() -> Result<Vec<DeviceInfo>, String> {
    let manager = PlatformManager::new().await.map_err(|e| e.to_string())?;
    let adapters = manager.adapters().await.map_err(|e| e.to_string())?;
    let central = adapters.first().ok_or("No Bluetooth adapters found")?;

    central
        .start_scan(ScanFilter::default())
        .await
        .map_err(|e| e.to_string())?;
    time::sleep(Duration::from_secs(5)).await;

    let mut devices: Vec<DeviceInfo> = Vec::new();
    for adapter in adapters {
        let peripherals = adapter.peripherals().await.map_err(|e| e.to_string())?;
        for peripheral in peripherals {
            if let Some(props) = peripheral.properties().await.map_err(|e| e.to_string())? {
                let manufacturer_data_json = serde_json::to_value(&props.manufacturer_data)
                    .unwrap_or(serde_json::Value::Null);
                devices.push(DeviceInfo {
                    id: peripheral.id().to_string(),
                    name: props.local_name.unwrap_or_else(|| "Unknown".into()),
                    address: format!("{}", props.address),
                    manufacturer_data: manufacturer_data_json,
                });
            }
        }
    }
    Ok(devices)
}

#[tauri::command]
pub async fn retrieve_services_and_characteristics(
    device_id: String,
) -> Result<Vec<ServiceInfo>, String> {
    let manager = PlatformManager::new().await.map_err(|e| e.to_string())?;
    let adapters = manager.adapters().await.map_err(|e| e.to_string())?;
    let central = adapters.first().ok_or("No Bluetooth adapters found")?;

    central
        .start_scan(ScanFilter::default())
        .await
        .map_err(|e| e.to_string())?;
    time::sleep(Duration::from_secs(5)).await;

    let peripherals = central.peripherals().await.map_err(|e| e.to_string())?;
    for peripheral in peripherals {
        if peripheral.id().to_string() == device_id {
            peripheral.connect().await.map_err(|e| e.to_string())?;
            peripheral
                .discover_services()
                .await
                .map_err(|e| e.to_string())?;
            let services_raw = peripheral.services();
            let mut services: Vec<ServiceInfo> = Vec::new();
            for service in services_raw {
                let characteristics: Vec<CharacteristicInfo> = service
                    .characteristics
                    .iter()
                    .map(|c| CharacteristicInfo {
                        uuid: c.uuid.to_string(),
                        properties: format!("{:?}", c.properties)
                            .trim_matches(|ch| ch == '{' || ch == '}')
                            .split(',')
                            .map(|s| s.trim().to_string())
                            .filter(|s| !s.is_empty())
                            .collect(),
                    })
                    .collect();
                services.push(ServiceInfo {
                    uuid: service.uuid.to_string(),
                    characteristics,
                });
            }
            peripheral.disconnect().await.ok();
            return Ok(services);
        }
    }
    Err(format!("Device with ID {} not found", device_id))
}
