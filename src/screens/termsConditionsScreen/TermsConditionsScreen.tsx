import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import styles from './TermsConditionsScreenStyle';

export default function TermsConditionsScreen() {
  const navigation = useNavigation();

  const loremText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book";

  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderComponent
        title="Terms & Conditions"
        onPressBack={() => navigation.goBack()}
      />

      {/* Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.paragraph}>{loremText}</Text>
        <Text style={styles.paragraph}>{loremText}</Text>
        <Text style={styles.paragraph}>{loremText}</Text>
        <Text style={styles.paragraph}>{loremText}</Text>
        <Text style={styles.paragraph}>{loremText}</Text>
        <Text style={styles.paragraph}>{loremText}</Text>
      </ScrollView>
    </View>
  );
}
