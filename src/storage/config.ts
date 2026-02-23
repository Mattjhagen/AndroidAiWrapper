import AsyncStorage from '@react-native-async-storage/async-storage';

const CONFIG_KEY = '@ai_connect_config';

export interface AIConfig {
    provider: 'openai' | 'anthropic' | 'openclae' | 'custom';
    apiKey?: string;
    customUrl?: string;
}

export const saveConfig = async (config: AIConfig) => {
    try {
        await AsyncStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    } catch (e) {
        console.error('Failed to save config', e);
    }
};

export const loadConfig = async (): Promise<AIConfig | null> => {
    try {
        const value = await AsyncStorage.getItem(CONFIG_KEY);
        if (value !== null) {
            return JSON.parse(value) as AIConfig;
        }
    } catch (e) {
        console.error('Failed to load config', e);
    }
    return null;
};

export const clearConfig = async () => {
    try {
        await AsyncStorage.removeItem(CONFIG_KEY);
    } catch (e) {
        console.error('Failed to clear config', e);
    }
};
