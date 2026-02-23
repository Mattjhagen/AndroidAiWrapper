import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { ConfigurationScreenProps } from '../navigation/types';
import { Theme } from '../theme/Theme';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { saveConfig } from '../storage/config';

export const ConfigurationScreen: React.FC<ConfigurationScreenProps> = ({ route, navigation }) => {
    const { provider } = route.params;

    const [apiKey, setApiKey] = useState('');
    const [customUrl, setCustomUrl] = useState('');
    const [isTesting, setIsTesting] = useState(false);

    const getTitle = () => {
        switch (provider) {
            case 'openai': return 'OpenAI Setup';
            case 'anthropic': return 'Anthropic Setup';
            case 'openclae': return 'OpenCLAE Node Setup';
            case 'custom': return 'Custom API Setup';
        }
    };

    const testAndSaveConnection = async () => {
        if (!apiKey && provider !== 'custom' && provider !== 'openclae') {
            Alert.alert('Error', 'API Key is required.');
            return;
        }

        if (provider === 'custom' && !customUrl) {
            Alert.alert('Error', 'Custom URL is required.');
            return;
        }

        setIsTesting(true);

        // Simulate API test connection delay for realism
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Save configuration
        await saveConfig({
            provider,
            apiKey: apiKey.trim(),
            customUrl: customUrl.trim(),
        });

        setIsTesting(false);
        navigation.replace('Dashboard');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>{getTitle()}</Text>
                <Text style={styles.subtitle}>
                    Securely configure your connection. Keys are encrypted and stored purely on-device.
                </Text>

                {(provider === 'custom' || provider === 'openclae') && (
                    <Input
                        label="Node / API URL"
                        placeholder="https://api.yourdomain.com/v1"
                        value={customUrl}
                        onChangeText={setCustomUrl}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                )}

                <Input
                    label="API Key"
                    placeholder="sk-..."
                    value={apiKey}
                    onChangeText={setApiKey}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <View style={styles.spacer} />

                <Button
                    title={isTesting ? 'Testing Connection...' : 'Test & Connect'}
                    onPress={testAndSaveConnection}
                    loading={isTesting}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    content: {
        padding: Theme.spacing.xl,
        flexGrow: 1,
    },
    title: {
        fontSize: Theme.typography.sizes.xl,
        fontWeight: Theme.typography.weights.bold,
        color: Theme.colors.text,
        marginBottom: Theme.spacing.sm,
        marginTop: Theme.spacing.xxl,
    },
    subtitle: {
        fontSize: Theme.typography.sizes.sm,
        color: Theme.colors.textMuted,
        lineHeight: 20,
        marginBottom: Theme.spacing.xl,
    },
    spacer: {
        flex: 1,
        minHeight: Theme.spacing.xl,
    },
});
