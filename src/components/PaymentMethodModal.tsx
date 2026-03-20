
import React from 'react';
import {
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { FontFamily } from '../assets/fonts';
import { PaymentMethod } from '../redux/dataTypes';
import { colors } from '../theme/colors';
import { moderateScale } from '../theme/Metrics';
import { PrimaryButton } from './PrimaryButton';
import { Icons } from '../assets/icons';

type Props = {
    visible: boolean;
    onClose: () => void;
    paymentMethods: PaymentMethod[];
    onSelect: (method: PaymentMethod) => void;
    selectedMethod: PaymentMethod | null;
    onConfirm: () => void;
};

export default function PaymentMethodModal({
    visible,
    onClose,
    paymentMethods,
    onSelect,
    selectedMethod,
    onConfirm,
}: Props) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalBox}>
                    <Text style={styles.title}>Select Payment Method</Text>
                    <FlatList
                        data={paymentMethods}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={styles.listContent}
                        renderItem={({ item }) => {
                            const isActive = selectedMethod?.id === item.id;
                            const isItemActive = item.is_active;

                            return (
                                <TouchableOpacity
                                    style={[
                                        styles.methodItem,
                                        isActive && styles.activeMethodItem,
                                        !isItemActive && styles.disabledMethodItem,
                                    ]}
                                    onPress={() => isItemActive && onSelect(item)}
                                    disabled={!isItemActive}
                                    activeOpacity={0.8}
                                >
                                    <View style={styles.methodLeft}>
                                        <Text
                                            style={[
                                                styles.methodText,
                                                isActive && styles.activeMethodText,
                                                !isItemActive && styles.disabledMethodText,
                                            ]}
                                        >
                                            {item.name}
                                        </Text>
                                    </View>
                                    <View style={styles.methodRight}>
                                        {isItemActive ? (
                                            <View
                                                style={[
                                                    styles.radioCircle,
                                                    isActive && styles.activeRadioCircle,
                                                ]}
                                            >
                                                {isActive && (
                                                    <Image
                                                        source={Icons.correct}
                                                        style={styles.checkIcon}
                                                        resizeMode="contain"
                                                    />
                                                )}
                                            </View>
                                        ) : (
                                            <View style={styles.inactiveBadge}>
                                                <Text style={styles.inactiveText}>Unavailable</Text>
                                            </View>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                    <View style={styles.buttonRow}>
                        <PrimaryButton
                            title="Cancel"
                            onPress={onClose}
                            style={styles.cancelButton}
                            labelStyle={styles.cancelLabel}
                        />
                        <PrimaryButton
                            title="Confirm"
                            onPress={selectedMethod ? onConfirm : () => { }}
                            style={[
                                styles.confirmButton,
                                !selectedMethod ? { opacity: 0.5 } : {},
                            ]}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        width: '90%',
        backgroundColor: colors.white,
        borderRadius: moderateScale(16),
        padding: moderateScale(24),
        maxHeight: '70%',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontFamily: FontFamily.bold,
        fontSize: moderateScale(18),
        color: colors.black,
        marginBottom: moderateScale(20),
        textAlign: 'center',
        includeFontPadding: false,
    },
    listContent: {
        paddingVertical: moderateScale(5),
    },
    methodItem: {
        padding: moderateScale(16),
        borderRadius: moderateScale(12),
        borderWidth: 1.5,
        borderColor: colors.inputBorder,
        marginBottom: moderateScale(12),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    activeMethodItem: {
        borderColor: colors.primary,
        backgroundColor: colors.backgorund3,
        shadowColor: colors.primary,
        shadowOpacity: 0.2,
    },
    disabledMethodItem: {
        borderColor: colors.devider,
        backgroundColor: colors.background,
        shadowOpacity: 0,
        elevation: 0,
    },
    methodLeft: {
        flex: 1,
    },
    methodRight: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: moderateScale(10),
    },
    methodText: {
        fontFamily: FontFamily.semiBold,
        fontSize: moderateScale(15),
        color: colors.text,
        includeFontPadding: false,
    },
    activeMethodText: {
        color: colors.primary,
        fontWeight: '700',
    },
    disabledMethodText: {
        color: colors.mutedText,
    },
    radioCircle: {
        width: moderateScale(22),
        height: moderateScale(22),
        borderRadius: moderateScale(11),
        borderWidth: 1.5,
        borderColor: colors.inputBorder,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    activeRadioCircle: {
        borderColor: colors.primary,
        backgroundColor: colors.primary,
        borderWidth: 0,
    },
    checkIcon: {
        width: moderateScale(12),
        height: moderateScale(12),
        tintColor: colors.white,
    },
    inactiveBadge: {
        backgroundColor: colors.devider,
        paddingHorizontal: moderateScale(8),
        paddingVertical: moderateScale(4),
        borderRadius: moderateScale(6),
    },
    inactiveText: {
        fontSize: moderateScale(10),
        color: colors.mutedText,
        fontFamily: FontFamily.medium,
        includeFontPadding: false,
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: moderateScale(20),
        gap: moderateScale(15),
    },
    cancelButton: {
        flex: 1,
        backgroundColor: colors.backgorund3,
        borderRadius: moderateScale(10),
    },
    cancelLabel: {
        color: colors.primary,
    },
    confirmButton: {
        flex: 1,
        borderRadius: moderateScale(10),
    },
});
