import React from 'react';
import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';

// App serves as the custom entry point of the application.
// We import and render ExpoRoot, pointing it to our src/app directory context.
export default function App() {
  // Define the context for the file-based routes in our src/app directory
  const ctx = require.context('./src/app');

  return <ExpoRoot context={ctx} />;
}

// Register App as the root component of the Expo project
registerRootComponent(App);
