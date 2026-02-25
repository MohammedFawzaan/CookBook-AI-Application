import { useState } from "react";
import { useSSO } from "@clerk/clerk-expo";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import GlobalApi from "@/services/GlobalApi";

export const useClerkAuth = () => {
    const [loading, setLoading] = useState(false);
    const { startSSOFlow } = useSSO();
    const router = useRouter();

    const saveUserToDb = async (clerkUser: any) => {
        try {
            const email = clerkUser?.primaryEmailAddress?.emailAddress;
            if (!email) return;

            const res = await GlobalApi.FindUserByEmail(email);
            const existingUsers = res?.data?.data;

            if (!existingUsers || existingUsers.length === 0) {
                await GlobalApi.CreateUser({
                    name: clerkUser?.fullName || '',
                    email: email,
                    clerkId: clerkUser?.id || '',
                    credits: 5,
                });
                console.log("New user saved to Strapi:", email);
            } else {
                console.log("User already exists in Strapi:", email);
            }
        } catch (error) {
            console.log("Failed to save user to Strapi:", error);
        }
    };

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

    return { loading, handleAuth, saveUserToDb };
};