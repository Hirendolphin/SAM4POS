import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
import { moderateScale } from '../theme/Metrics';
import { FontFamily } from '../assets/fonts';
import InputTextComponent from './InputTextComponent';
import { PrimaryButton } from './PrimaryButton';

interface ClientInfoModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (ip: string, port: string) => void;
}

const ClientInfoModal: React.FC<ClientInfoModalProps> = ({
    visible,
    onClose,
    onSubmit,
}) => {
    const [ip, setIp] = useState('');
    const [port, setPort] = useState('');
    const [error, setError] = useState('');

    const handleSave = () => {
        if (!ip || !port) {
            setError('Please enter both Client IP and Client Port.');
            return;
        }
        setError('');
        onSubmit(ip, port);
    };

    const handleClose = () => {
        setIp('')
        setPort('')
        setError('')
        onClose();
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={handleClose}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
                        <Text style={styles.title}>Enter Client Details</Text>

                        <InputTextComponent
                            label="Client IP"
                            placeholdertext="Enter Client IP"
                            inputProps={{
                                value: ip,
                                onChangeText: setIp,
                                keyboardType: 'numeric', // Assuming IP is numeric-ish
                            }}
                            mainStyle={{ marginTop: moderateScale(15) }}

                        />

                        <InputTextComponent
                            label="Client Port"
                            placeholdertext="Enter Client Port"
                            inputProps={{
                                value: port,
                                onChangeText: setPort,
                                keyboardType: 'numeric',
                            }}
                            mainStyle={{ marginTop: moderateScale(15) }}
                        />

                        {error ? <Text style={styles.errorText}>{error}</Text> : null}

                        <View style={styles.buttonContainer}>
                            <PrimaryButton
                                title="CANCEL"
                                onPress={handleClose}
                                style={{ ...styles.button, ...styles.cancelButton }}
                                labelStyle={styles.cancelButtonText}
                            />
                            <PrimaryButton
                                title="SAVE"
                                onPress={handleSave}
                                style={{ ...styles.button, ...styles.saveButton }}
                            />
                        </View>
                    </ScrollView>
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
        marginBottom: moderateScale(10),
    },
    errorText: {
        color: colors.red,
        fontSize: moderateScale(12),
        marginTop: moderateScale(10),
        textAlign: 'center',
        fontFamily: FontFamily.regular
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: moderateScale(20),
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        marginHorizontal: moderateScale(5),
    },
    cancelButton: {
        backgroundColor: colors.backgorund3,
    },
    cancelButtonText: {
        color: colors.primary,
    },
    saveButton: {
        backgroundColor: colors.primary,
    },
});

export default ClientInfoModal;
