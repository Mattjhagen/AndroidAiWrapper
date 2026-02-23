import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { DashboardScreenProps } from '../navigation/types';
import { Theme } from '../theme/Theme';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { AIConfig, loadConfig, clearConfig } from '../storage/config';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export const MainDashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
    const [config, setConfig] = useState<AIConfig | null>(null);
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchConfig = async () => {
            const saved = await loadConfig();
            if (saved) {
                setConfig(saved);
                setMessages([
                    {
                        id: '1',
                        role: 'assistant',
                        content: `Connected to ${saved.provider} successfully! How can I assist you today?`,
                    }
                ]);
            } else {
                navigation.replace('Welcome');
            }
        };
        fetchConfig();
    }, []);

    const handleSend = async () => {
        if (!prompt.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: prompt.trim() };
        setMessages((prev) => [...prev, userMsg]);
        setPrompt('');
        setIsLoading(true);

        // Placeholder logic: in reality we would use `config.provider` and `config.apiKey` to make `fetch` request.
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: 'This is a simulated response indicating your connection setup architecture is ready.',
                }
            ]);
            setIsLoading(false);
        }, 1500);
    };

    const handleDisconnect = async () => {
        await clearConfig();
        navigation.replace('Welcome');
    };

    const renderMessage = ({ item }: { item: Message }) => {
        const isUser = item.role === 'user';
        return (
            <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.assistantBubble]}>
                <Text style={[styles.messageText, isUser ? styles.userText : styles.assistantText]}>
                    {item.content}
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>AI Dashboard</Text>
                        <Text style={styles.headerSubtitle}>
                            Connected via {config?.provider.toUpperCase() || 'Unknown'}
                        </Text>
                    </View>
                    <Button title="Discon..." variant="outline" onPress={handleDisconnect} style={styles.disconnectBtn} />
                </View>

                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMessage}
                    contentContainerStyle={styles.messageList}
                    showsVerticalScrollIndicator={false}
                />

                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Type a message..."
                        value={prompt}
                        onChangeText={setPrompt}
                        style={styles.chatInput}
                    />
                    <Button
                        title="Send"
                        onPress={handleSend}
                        disabled={!prompt.trim() || isLoading}
                        loading={isLoading}
                        style={styles.sendButton}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Theme.spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.border,
    },
    headerTitle: {
        color: Theme.colors.text,
        fontSize: Theme.typography.sizes.lg,
        fontWeight: Theme.typography.weights.bold,
    },
    headerSubtitle: {
        color: Theme.colors.success,
        fontSize: Theme.typography.sizes.sm,
        marginTop: Theme.spacing.xs,
    },
    disconnectBtn: {
        height: 36,
        paddingHorizontal: Theme.spacing.md,
    },
    messageList: {
        padding: Theme.spacing.lg,
        paddingBottom: Theme.spacing.xl,
    },
    messageBubble: {
        padding: Theme.spacing.md,
        borderRadius: Theme.borderRadius.lg,
        marginBottom: Theme.spacing.md,
        maxWidth: '85%',
    },
    userBubble: {
        backgroundColor: Theme.colors.primary,
        alignSelf: 'flex-end',
        borderBottomRightRadius: 4,
    },
    assistantBubble: {
        backgroundColor: Theme.colors.surface,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        alignSelf: 'flex-start',
        borderTopLeftRadius: 4,
    },
    messageText: {
        fontSize: Theme.typography.sizes.md,
        lineHeight: 22,
    },
    userText: {
        color: '#fff',
    },
    assistantText: {
        color: Theme.colors.text,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: Theme.spacing.md,
        paddingBottom: Platform.OS === 'ios' ? Theme.spacing.xl : Theme.spacing.md,
        backgroundColor: Theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: Theme.colors.border,
        alignItems: 'center',
    },
    chatInput: {
        flex: 1,
        marginBottom: 0,
        height: 48,
    },
    sendButton: {
        marginLeft: Theme.spacing.sm,
        width: 80,
        height: 48,
        marginVertical: 0,
    },
});
