import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface CustomAlertProps {
    visible: boolean;
    title: string;
    message: string;
    type?: AlertType;
    onClose: () => void;
    autoDismiss?: boolean;
}

export default function CustomAlert({
    visible,
    title,
    message,
    type = 'info',
    onClose,
    autoDismiss = true,
}: CustomAlertProps) {
    const { colors } = useTheme();
    const scaleAnim = useRef(new Animated.Value(0.85)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const config = {
        success: { icon: '✅', color: colors.success },
        error: { icon: '❌', color: colors.error },
        warning: { icon: '⚠️', color: colors.warning },
        info: { icon: 'ℹ️', color: colors.info },
    }[type];

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                    tension: 180,
                    friction: 12,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();

            if (autoDismiss) {
                const timer = setTimeout(() => {
                    handleClose();
                }, 4000);
                return () => clearTimeout(timer);
            }
        }
    }, [visible]);

    const handleClose = () => {
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 0.85,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start(() => onClose());
    };

    if (!visible) return null;

    return (
        <Modal transparent visible={visible} animationType="none" onRequestClose={handleClose}>
            <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={handleClose}>
                <Animated.View
                    style={[
                        styles.card,
                        {
                            backgroundColor: colors.alertBg,
                            borderColor: colors.border,
                            transform: [{ scale: scaleAnim }],
                            opacity: opacityAnim,
                        },
                    ]}
                >
                    <View style={[styles.topBar, { backgroundColor: config.color }]} />

                    <View style={styles.body}>
                        <Text style={styles.icon}>{config.icon}</Text>
                        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
                        <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>

                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: config.color }]}
                            onPress={handleClose}
                        >
                            <Text style={styles.buttonText}>Got it</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    card: {
        width: '100%',
        borderRadius: 20,
        borderWidth: 1,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 12,
    },
    topBar: {
        height: 5,
        width: '100%',
    },
    body: {
        padding: 24,
        alignItems: 'center',
    },
    icon: {
        fontSize: 40,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 8,
        textAlign: 'center',
        fontFamily: 'outfit-bold',
    },
    message: {
        fontSize: 15,
        color: '#444',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 20,
        fontFamily: 'outfit',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 50,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        fontFamily: 'outfit-bold',
    },
});
