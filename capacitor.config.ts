import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mehrdafon.abtenau',
  appName: 'Abtenau',
  webDir: 'www',
  ios: {
    handleApplicationNotifications: false,
  },
};

export default config;
