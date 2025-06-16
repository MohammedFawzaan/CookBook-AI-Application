import { Stack } from "expo-router";
import { LogtoProvider, LogtoConfig, UserScope } from '@logto/rn';

const config: LogtoConfig = {
  endpoint: 'https://4de4gq.logto.app/',
  appId: 'zztlc7ysbid8j7xqei6dx',
  scopes: [
    UserScope.Email
  ]
};

export default function RootLayout() {
  return (
    <LogtoProvider config={config}>
      <Stack>
        <Stack.Screen
          name="Landing"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </LogtoProvider>
  );
}