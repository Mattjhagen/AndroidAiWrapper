import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ProviderOptionsScreenProps } from '../navigation/types';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Theme } from '../theme/Theme';

export const ProviderOptionsScreen: React.FC<ProviderOptionsScreenProps> = ({ navigation }) => {
    const options = [
        { id: 'openai', name: 'OpenAI', description: 'Connect using your OpenAI API key.' },
        { id: 'anthropic', name: 'Anthropic', description: 'Connect using your Anthropic API key.' },
        { id: 'openclae', name: 'OpenCLAE', description: 'Connect to a decentralized OpenCLAE node.' },
        { id: 'custom', name: 'Custom URL', description: 'Connect to any OpenAI-compatible custom endpoint.' },
    ] as const;

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>Select AI Provider</Text>
            <Text style={styles.subtitle}>Choose which intelligence you want to connect to.</Text>

            {options.map((option) => (
                <Card key={option.id} style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>{option.name}</Text>
                    </View>
                    <Text style={styles.cardDescription}>{option.description}</Text>
                    <Button
                        title="Configure"
                        variant="secondary"
                        onPress={() => navigation.navigate('Configuration', { provider: option.id })}
                    />
                </Card>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    content: {
        padding: Theme.spacing.xl,
    },
    title: {
        fontSize: Theme.typography.sizes.xl,
        fontWeight: Theme.typography.weights.bold,
        color: Theme.colors.text,
        marginBottom: Theme.spacing.xs,
    },
    subtitle: {
        fontSize: Theme.typography.sizes.md,
        color: Theme.colors.textMuted,
        marginBottom: Theme.spacing.xl,
    },
    card: {
        marginBottom: Theme.spacing.lg,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Theme.spacing.sm,
    },
    cardTitle: {
        fontSize: Theme.typography.sizes.lg,
        fontWeight: Theme.typography.weights.semibold,
        color: Theme.colors.primary,
    },
    cardDescription: {
        fontSize: Theme.typography.sizes.sm,
        color: Theme.colors.textMuted,
        marginBottom: Theme.spacing.md,
        lineHeight: 20,
    },
});
