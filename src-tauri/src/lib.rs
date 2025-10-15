mod commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![
      commands::discover_audio_devices,
      commands::retrieve_services_and_characteristics,
      commands::trigger_default_audio_mode,
      commands::trigger_anc_audio_mode,
      commands::trigger_transparency_audio_mode,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
