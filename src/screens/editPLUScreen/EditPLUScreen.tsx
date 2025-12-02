import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icons } from '../../assets/icons';
import HeaderComponent from '../../components/HeaderComponent';
import { PrimaryButton } from '../../components/PrimaryButton';
import ProgressModal from '../../components/ProgressModal';
import { moderateScale } from '../../theme/Metrics';
import { colors } from '../../theme/colors';
import GroupModal from '../dashboardScreen/groupModal/GroupModal';
import styles from './EditPLUScreenStyle';
import PriceModal from './priceModal/PriceModal';
import StockModal from './stockModal/StockModal';
import EditPLUController from './EditPLUController';
import { CommonActions } from '@react-navigation/native';

export default function EditPLUScreen() {
  const {
    desc,
    setDesc,
    kpDesc,
    setKpDesc,
    pluProductData,
    addPrice,
    prices,
    getLevelLabel,
    editPrice,
    deletePrice,
    stockQty,
    setStockModalVisible,
    getGroupNameById,
    groupLinks,
    setGroupModal,
    setGroupTitle,
    setActiveLinkKey,
    getGroupStatusNameById,
    selectedStatusGroup,
    setStatusGroupModal,
    handleSave,
    isLoading,
    level,
    isEdit,
    levelListForEdit,
    levelListForAdd,
    handleSubmitPrice,
    price,
    setLevel,
    setPrice,
    priceModalVisible,
    stockModalVisible,
    stock,
    setStock,
    setStockQty,
    groupModal,
    statusGroupModal,
    groupTitle,
    groupList,
    statusGroupList,
    activeLinkKey,
    setSelectedStatusGroup,
    setGroupLinks,
    setPriceModalVisible,
    navigation,
  } = EditPLUController();
  return (
    <View style={styles.screen}>
      <HeaderComponent
        title="Edit PLU"
        onPressBack={() => navigation.dispatch(CommonActions.goBack())}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Card */}
        <View style={styles.card}>
          <InputWithCounter
            label="DESCRIPTION"
            max={30}
            value={desc || ''}
            onChange={setDesc}
          />
          <InputWithCounter
            label="KP DESCRIPTION"
            max={30}
            value={kpDesc || ''}
            onChange={setKpDesc}
          />
          <ReadOnlyInput label="PLU CODE" value={pluProductData?.plu_code} />
        </View>

        {/* PRICE SECTION */}
        <Section title="PRICE" />

        <View style={styles.priceSectionWrapper}>
          {/* ADD PRICE BUTTON */}
          <View style={styles.addButtonRow}>
            <TouchableOpacity onPress={addPrice} style={styles.addButton}>
              <Text style={styles.addButtonText}>+ ADD PRICE</Text>
            </TouchableOpacity>
          </View>

          {/* TABLE HEADER */}
          <View style={styles.headerRow}>
            <Text style={[styles.headerText, styles.col12]}>NO</Text>
            <Text style={[styles.headerText, styles.col50]}>PRICE LEVEL ⬍</Text>
            <Text style={[styles.headerText, styles.col15]}>PRICE ⬍</Text>
            <Text style={[styles.headerText, styles.col10]}></Text>
          </View>

          {/* ROWS */}
          <FlatList
            data={prices}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.dataRow}>
                <Text style={[styles.cell, styles.col12]}>{index + 1}</Text>
                <Text style={[styles.cell, styles.col50Bold]}>
                  {getLevelLabel(item.id_price_level)}
                </Text>
                <Text style={[styles.cell, styles.col15]}>
                  {item.long_plu_price}
                </Text>

                <View style={styles.actions}>
                  <Pressable
                    onPress={() => editPrice(item)}
                    style={styles.editBtn}
                  >
                    <Image source={Icons.edit} style={styles.icon} />
                  </Pressable>
                  <Pressable
                    onPress={() => deletePrice(item)}
                    style={styles.deleteBtn}
                  >
                    <Image
                      source={Icons.delete}
                      style={styles.icon}
                      resizeMode="contain"
                    />
                  </Pressable>
                </View>
              </View>
            )}
          />
        </View>

        {/* STOCK SECTION */}
        <Section title="STOCK" />
        <EditableRow
          label="STOCK"
          value={Number(stock).toFixed(2) || 0}
          onPressStock={() => {
            setStockModalVisible(true);
          }}
        />

        {/* GENERAL SECTION */}
        <Section title="GENERAL" />
        <GotoRow
          label="GROUP LINK1"
          value={getGroupNameById(groupLinks.link1)}
          onPressGroup={() => {
            setGroupModal(true);
            setGroupTitle('GROUP LINK1');
            setActiveLinkKey('link1');
          }}
        />

        <GotoRow
          label="GROUP LINK2"
          value={getGroupNameById(groupLinks.link2)}
          onPressGroup={() => {
            setGroupModal(true);
            setGroupTitle('GROUP LINK2');
            setActiveLinkKey('link2');
          }}
        />

        <GotoRow
          label="GROUP LINK3"
          value={getGroupNameById(groupLinks.link3)}
          onPressGroup={() => {
            setGroupModal(true);
            setGroupTitle('GROUP LINK3');
            setActiveLinkKey('link3');
          }}
        />
        <GotoRow
          label="PLU STATUS GROUP LINK"
          value={getGroupStatusNameById(selectedStatusGroup)}
          onPressGroup={() => {
            setStatusGroupModal(true);
            setGroupTitle('PLU STATUS GROUP LINK');
          }}
        />
      </ScrollView>

      <PrimaryButton
        title="Save"
        onPress={handleSave}
        style={styles.saveButton}
      />
      <PriceModal
        description={desc}
        level={level}
        levelList={isEdit ? levelListForEdit : levelListForAdd}
        onClose={() => setPriceModalVisible(false)}
        onSubmit={handleSubmitPrice}
        pluCode={pluProductData?.plu_code}
        price={price}
        setLevel={setLevel}
        setPrice={setPrice}
        visible={priceModalVisible}
        isEdit={isEdit}
      />
      <StockModal
        visible={stockModalVisible}
        onClose={() => setStockModalVisible(false)}
        stock={stock || 0}
        setStock={setStock}
        onSubmit={() => {
          // stock is already updated by setStock from the modal
          setStockModalVisible(false);
        }}
      />
      <GroupModal
        visible={groupModal || statusGroupModal}
        title={groupTitle}
        groupList={groupModal ? groupList : statusGroupList}
        selectedGroup={
          statusGroupModal
            ? selectedStatusGroup
            : activeLinkKey
            ? groupLinks[activeLinkKey]
            : null
        }
        onClose={() => {
          setStatusGroupModal(false);
          setGroupModal(false);
        }}
        onSelect={id => {
          if (statusGroupModal) {
            setSelectedStatusGroup(id);
            setStatusGroupModal(false);
          } else {
            if (activeLinkKey) {
              setGroupLinks(prev => ({
                ...prev,
                [activeLinkKey]: id,
              }));
            }
            setGroupModal(false);
          }
        }}
      />
      {isLoading && (
        <ProgressModal ismodelVisible={isLoading} label="Updating PLU" />
      )}
    </View>
  );
}

/* -------------------------------------- */
/* COMPONENTS BELOW */
/* -------------------------------------- */

const InputWithCounter = ({ label, max, value, onChange }: any) => {
  return (
    <View style={styles.inputWrapper}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.counter}>
          {value.length}/{max}
        </Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChange}
          maxLength={max}
        />

        {value !== '' && (
          <TouchableOpacity onPress={() => onChange('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const ReadOnlyInput = ({ label, value }) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.label}>{label}</Text>

    <View style={[styles.inputRow, { backgroundColor: colors.background }]}>
      <Text style={styles.readonlyText}>{value}</Text>
    </View>
  </View>
);

const Section = ({ title }) => (
  <View style={styles.sectionBar}>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

const EditableRow = ({ label, value, onPressStock }) => (
  <View style={styles.row}>
    <View>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>

    <TouchableOpacity onPress={onPressStock}>
      <Image
        source={Icons.edit}
        style={{ height: moderateScale(25), width: moderateScale(25) }}
      />
    </TouchableOpacity>
  </View>
);

const GotoRow = ({ label, value, onPressGroup }) => (
  <View style={styles.row}>
    <View>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>

    <TouchableOpacity style={styles.gotoButton} onPress={onPressGroup}>
      <Image
        source={Icons.down}
        style={{ height: moderateScale(15), width: moderateScale(15) }}
        resizeMode="contain"
      />
      {/* <Text style={styles.gotoText}>GOTO</Text> */}
    </TouchableOpacity>
  </View>
);
