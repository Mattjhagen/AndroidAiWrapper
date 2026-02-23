import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WelcomeScreenProps } from '../navigation/types';
import { Button } from '../components/Button';
import { Theme } from '../theme/Theme';
import { loadConfig } from '../storage/config';

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
    useEffect(() => {
        // Check if user already configured an AI
        const checkConfig = async () => {
            const config = await loadConfig();
            if (config && (config.apiKey || config.customUrl)) {
                navigation.replace('Dashboard');
            }
        };
        checkConfig();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>AI Connect</Text>
                <Text style={styles.subtitle}>
                    Your unified bridge to Cloud AI models and OpenCLAE nodes.
                </Text>
            </View>
            <View style={styles.footer}>
                <Button
                    title="Get Started"
                    onPress={() => navigation.navigate('ProviderOptions')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
        padding: Theme.spacing.xl,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: Theme.typography.sizes.xxl,
        fontWeight: Theme.typography.weights.bold,
        color: Theme.colors.primary,
        marginBottom: Theme.spacing.md,
    },
    subtitle: {
        fontSize: Theme.typography.sizes.lg,
        color: Theme.colors.textMuted,
        textAlign: 'center',
        lineHeight: 28,
    },
    footer: {
        paddingBottom: Theme.spacing.xl,
    },
});
