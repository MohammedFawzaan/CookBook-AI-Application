import { useState } from "react";
import { useSSO } from "@clerk/clerk-expo";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

export const useClerkAuth = () => {
    const [loading, setLoading] = useState(false);
    const { startSSOFlow } = useSSO();
    const router = useRouter();

    const handleAuth = async (strategy: 'oauth_google') => {
        try {
            setLoading(true);
            const { createdSessionId, setActive } = await startSSOFlow({ strategy });
            if (createdSessionId && setActive) {
                await setActive({ session: createdSessionId });
                router.replace("/(tabs)/Home");
            }
        } catch (error) {
            console.log("Error in Auth", error);
            Alert.alert("Error", "Failed to sign in with Google. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return { loading, handleAuth };
};