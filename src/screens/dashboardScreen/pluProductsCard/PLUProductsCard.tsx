import { Image, Pressable, Text, View } from 'react-native';
import { Icons } from '../../../assets/icons';
import { moderateScale } from '../../../theme/Metrics';
import styles from './PLUProductsCardStyle';
import { PLUItem } from '../../../redux/dataTypes';

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowKey}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

type PLU = {
  id: string;
  code: string;
  name: string;
  group: string;
  price: string;
  stock: number;
  kpDescription: string;
};

const PLUProductsCard = ({
  item,
  openEditModal,
  openDeleteModal,
}: {
  item: PLUItem;
  openEditModal: (item: PLUItem) => void;
  openDeleteModal: (item: PLUItem) => void;
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.pluLine}>
          <Text style={styles.pluKey}>PLU Code : </Text>
          <Text style={styles.pluKey}>{item.plu_code}</Text>
        </Text>
        <View style={styles.actions}>
          <Pressable onPress={() => openEditModal(item)} style={styles.editBtn}>
            <Image source={Icons.edit} style={styles.icon} />
          </Pressable>
          <Pressable
            onPress={() => openDeleteModal(item)}
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
      <View style={styles.separator} />
      <Row label="Description (PLU Name) :" value={item.plu_desc} />
      {/* <Row label="Group :" value={item.group} />
      <Row label="Price :" value={item.price} /> */}
      <Row label="Stock :" value={String(item.stock_qty)} />
      <View style={{ height: moderateScale(6) }} />
      {item?.str_kp_desc && (
        <>
          <Text style={styles.rowKey}>KP Description :</Text>
          <Text style={styles.rowValue}>{item.str_kp_desc}</Text>
        </>
      )}
    </View>
  );
};
export default PLUProductsCard;
