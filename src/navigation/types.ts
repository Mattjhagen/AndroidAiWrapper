import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Welcome: undefined;
    ProviderOptions: undefined;
    Configuration: { provider: 'openai' | 'anthropic' | 'openclae' | 'custom' };
    Dashboard: undefined;
};

export type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;
export type ProviderOptionsScreenProps = NativeStackScreenProps<RootStackParamList, 'ProviderOptions'>;
export type ConfigurationScreenProps = NativeStackScreenProps<RootStackParamList, 'Configuration'>;
export type DashboardScreenProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;
