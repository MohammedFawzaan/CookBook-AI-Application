import { View, Text, Modal, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

interface LoadingDialogProps {
    visible?: boolean;
    text?: string;
    onCancel?: () => void;
}

export default function LoadingDialog({ visible = false, text = 'Crafting your recipe...', onCancel }: LoadingDialogProps) {
    const { colors } = useTheme();

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                {onCancel && (
                    <TouchableOpacity style={styles.cancelButton} onPress={onCancel} activeOpacity={0.8}>
                        <Ionicons name="close" size={22} color="white" />
                    </TouchableOpacity>
                )}

                <View style={[styles.card, { backgroundColor: colors.alertBg, borderColor: colors.border }]}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={[styles.text1, { color: colors.text }]}>{text}</Text>
                    <Text style={[styles.subText, { color: colors.textMuted }]}>This may take a moment ✨</Text>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    cancelButton: {
        position: 'absolute',
        top: 60,
        right: 24,
        backgroundColor: 'rgba(255,255,255,0.15)',
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    card: {
        borderRadius: 20,
        paddingVertical: 36,
        paddingHorizontal: 48,
        alignItems: 'center',
        gap: 12,
        borderWidth: 1,
        width: '85%',
    },
    text1: {
        marginTop: 6,
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'outfit-bold',
        textAlign: 'center',
    },
    subText: {
        fontSize: 13,
        fontFamily: 'outfit',
        textAlign: 'center',
    },
});