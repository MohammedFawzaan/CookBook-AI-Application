import { useState } from "react";
import { useSSO, useUser } from "@clerk/clerk-expo";
import { Alert } from "react-native";

export const useClerkAuth = () => {
    const [loading, setLoading] = useState(false);
    const { startSSOFlow } = useSSO();

    const handleAuth = async (strategy: 'oauth_google') => {
        try {
            setLoading(true);
            const { createdSessionId, setActive } = await startSSOFlow({ strategy });
            if (createdSessionId && setActive) {
                await setActive({ session: createdSessionId });
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