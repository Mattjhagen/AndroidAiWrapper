import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacityProps,
} from 'react-native';
import { Theme } from '../theme/Theme';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    variant = 'primary',
    loading = false,
    style,
    disabled,
    ...props
}) => {
    const getContainerStyles = () => {
        switch (variant) {
            case 'secondary':
                return styles.secondaryContainer;
            case 'outline':
                return styles.outlineContainer;
            case 'primary':
            default:
                return styles.primaryContainer;
        }
    };

    const getTextStyles = () => {
        switch (variant) {
            case 'secondary':
            case 'outline':
                return styles.secondaryText;
            case 'primary':
            default:
                return styles.primaryText;
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={[
                styles.container,
                getContainerStyles(),
                (disabled || loading) && styles.disabled,
                style,
            ]}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? Theme.colors.text : Theme.colors.primary} />
            ) : (
                <Text style={[styles.text, getTextStyles()]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 52,
        borderRadius: Theme.borderRadius.lg,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Theme.spacing.lg, // fallback
        marginVertical: Theme.spacing.sm,
    },
    primaryContainer: {
        backgroundColor: Theme.colors.primary,
    },
    secondaryContainer: {
        backgroundColor: Theme.colors.surfaceHighlight,
    },
    outlineContainer: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: Theme.colors.primary,
    },
    text: {
        fontSize: Theme.typography.sizes.md,
        fontWeight: Theme.typography.weights.semibold,
    },
    primaryText: {
        color: Theme.colors.text,
    },
    secondaryText: {
        color: Theme.colors.text,
    },
    disabled: {
        opacity: 0.5,
    },
});
