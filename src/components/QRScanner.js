import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const QRScanner = ({ onScanSuccess }) => {
  const [scanned, setScanned] = useState(false);

  const handleQRCodeRead = (e) => {
    if (!scanned) {
      setScanned(true);
      Alert.alert('QR Code Scanned', e.data);
      onScanSuccess(e.data);
    }
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={handleQRCodeRead}
        flashMode={RNCamera.Constants.FlashMode.off}
        topContent={null}
        bottomContent={null}
        reactivate={true}
        reactivateTimeout={2000}
        showMarker={true}
        cameraStyle={styles.camera}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    height: '100%',
  },
});

export default QRScanner;
