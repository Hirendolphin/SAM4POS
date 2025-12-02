import NetInfo from '@react-native-community/netinfo';

export const isNetwork = async () => {
  try {
    const response = await NetInfo.fetch();
    return response.isConnected;
  } catch (error) {
    return false;
  }
};
