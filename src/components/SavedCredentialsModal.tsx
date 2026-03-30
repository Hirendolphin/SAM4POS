import React from 'react';
import { Modal, StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
import { moderateScale } from '../theme/Metrics';
import { FontFamily } from '../assets/fonts';
import { PrimaryButton } from './PrimaryButton';

interface SavedCredentialsModalProps {
    visible: boolean;
    credentialsList: any[];
    onClose: () => void;
    onLogin: (item: any) => void;
}

const SavedCredentialsModal: React.FC<SavedCredentialsModalProps> = ({
    visible,
    credentialsList,
    onClose,
    onLogin,
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Saved Logins</Text>
                    <Text style={styles.subtext}>
                        Select an account to log in securely.
                    </Text>

                    <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
                        {credentialsList?.map((item, index) => (
                            <View key={index.toString()} style={styles.credentialCard}>
                                <View style={styles.cardContent}>
                                    <Text style={styles.dealerText}>ID: {item.dealer_id}</Text>
                                    {item.client_ip ? (
                                        <Text style={styles.ipText}>IP: {item.client_ip}</Text>
                                    ) : null}
                                </View>
                                <PrimaryButton
                                    title="LOGIN"
                                    onPress={() => onLogin(item)}
                                    style={styles.smallLoginButton}
                                    labelStyle={styles.smallLoginButtonText}
                                />
                            </View>
                        ))}
                    </ScrollView>

                    <View style={styles.buttonContainer}>
                        <PrimaryButton
                            title="CLOSE"
                            onPress={onClose}
                            style={{ ...styles.button, ...styles.cancelButton }}
                            labelStyle={styles.cancelButtonText}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: colors.white,
        borderRadius: moderateScale(10),
        padding: moderateScale(20),
        maxHeight: '80%',
    },
    title: {
        fontSize: moderateScale(18),
        fontFamily: FontFamily.bold,
        color: colors.black,
        textAlign: 'center',
        marginBottom: moderateScale(5),
    },
    subtext: {
        fontSize: moderateScale(14),
        fontFamily: FontFamily.regular,
        color: colors.text,
        textAlign: 'center',
        marginBottom: moderateScale(15),
    },
    listContainer: {
        width: '100%',
        maxHeight: moderateScale(300),
    },
    credentialCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.backgorund2,
        borderRadius: moderateScale(8),
        padding: moderateScale(12),
        marginBottom: moderateScale(10),
        borderWidth: 1,
        borderColor: colors.devider,
    },
    cardContent: {
        flex: 1,
        marginRight: moderateScale(10),
    },
    dealerText: {
        fontFamily: FontFamily.bold,
        fontSize: moderateScale(14),
        color: colors.black,
        marginBottom: moderateScale(2),
    },
    ipText: {
        fontFamily: FontFamily.regular,
        fontSize: moderateScale(12),
        color: colors.textGray,
    },
    smallLoginButton: {
        paddingVertical: moderateScale(5),
        paddingHorizontal: moderateScale(10),
        height: undefined,
    },
    smallLoginButtonText: {
        color: colors.white,
        fontSize: moderateScale(12),
        fontFamily: FontFamily.semiBold,
        fontWeight: '600',
        includeFontPadding: false,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: moderateScale(10),
        justifyContent: 'center',
    },
    button: {
        flex: 1,
    },
    cancelButton: {
        backgroundColor: colors.backgorund3,
    },
    cancelButtonText: {
        color: colors.primary,
    },
});

export default SavedCredentialsModal;
