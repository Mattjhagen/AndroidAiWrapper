import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { Theme } from '../theme/Theme';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, style, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[
                    styles.input,
                    isFocused && styles.inputFocused,
                    error && styles.inputError,
                    style,
                ]}
                placeholderTextColor={Theme.colors.textMuted}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Theme.spacing.md,
        width: '100%',
    },
    label: {
        color: Theme.colors.text,
        fontSize: Theme.typography.sizes.sm,
        fontWeight: Theme.typography.weights.medium,
        marginBottom: Theme.spacing.xs,
        marginLeft: Theme.spacing.xs,
    },
    input: {
        backgroundColor: Theme.colors.surface,
        borderWidth: 1.5,
        borderColor: Theme.colors.border,
        borderRadius: Theme.borderRadius.lg,
        paddingHorizontal: Theme.spacing.md,
        height: 52,
        color: Theme.colors.text,
        fontSize: Theme.typography.sizes.md,
    },
    inputFocused: {
        borderColor: Theme.colors.primary,
    },
    inputError: {
        borderColor: Theme.colors.error,
    },
    errorText: {
        color: Theme.colors.error,
        fontSize: Theme.typography.sizes.xs,
        marginTop: Theme.spacing.xs,
        marginLeft: Theme.spacing.xs,
    },
});
