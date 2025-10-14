use btleplug::api::{Central, Manager, Peripheral, ScanFilter};
use btleplug::platform::{Manager as PlatformManager};
use std::time::Duration;
use tokio::time;

#[tauri::command]
pub fn trigger_default() {
  println!("Triggering default audio profile...");
}

#[tauri::command]
pub fn trigger_anc() {
  println!("Triggering active noise cancellation...");
}

#[tauri::command]
pub fn trigger_transparency() {
  println!("Triggering transparency mode...");
}

#[tauri::command]
pub async fn discover_audio_devices() {
  println!("Discovering audio devices...");
  let manager = PlatformManager::new().await.unwrap();
  let adapters = manager.adapters().await.unwrap();
  let central = adapters.first().unwrap();

  // start scanning for devices
  central.start_scan(ScanFilter::default()).await.unwrap();
  time::sleep(Duration::from_secs(10)).await;

  for adapter in adapters {
    println!("Found adapter: {}", adapter.adapter_info().await.unwrap());
    let peripherals = adapter.peripherals().await.unwrap();
    for peripheral in peripherals {
      let properties = peripheral.properties().await.unwrap();
      if let Some(props) = properties {
        println!(
          "Found device: {} - {:?} - {:?}",
          props.local_name.unwrap_or(String::from("Unknown")),
          props.address,
          props.manufacturer_data
        );
      } else {
        println!("Found device with no properties");
      }
    }
  }
}