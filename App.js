import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
 
import FormInput from './src/components/FormInput';
import FormPicker from './src/components/FormPicker';
import ImagePicker from './src/components/ImagePicker';
import QRScanner from './src/components/QRScanner';

import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  // --- State variables for all form fields ---
  const [donationType, setDonationType] = useState('');
  const [healthIssues, setHealthIssues] = useState('');
  const [allergies, setAllergies] = useState('');
  const [lastDonatedDate, setLastDonatedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false); // To control date picker visibility
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [bloodCount, setBloodCount] = useState('');
  const [clubName, setClubName] = useState('');
  const [bloodBagPhoto, setBloodBagPhoto] = useState(null); // Stores the selected blood bag image
  const [showScanner, setShowScanner] = useState(false);     // To control QR scanner visibility
  const [qrResult, setQrResult] = useState('');             // Stores the scanned QR code value

  /**
   * Handles the date change from the DateTimePicker.
   * @param {Event} event - The event object.
   * @param {Date} selectedDate - The date selected by the user.
   */
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || lastDonatedDate; // Fallback to current date if none selected
    setShowDatePicker(false); // Hide the date picker after selection
    setLastDonatedDate(currentDate); // Update the state with the selected date
  };

  /**
   * Handles the form submission.
   * Gathers all form data and logs it, then shows an alert.
   * In a real application, this data would be sent to a backend API.
   */
  const handleSubmit = () => {
    // Collect all the form data into a single object
    const donationDetails = {
      donationType,
      healthIssues,
      allergies,
      lastDonatedDate: lastDonatedDate.toDateString(), // Convert date object to string for display/storage
      age,
      weight,
      bloodPressure,
      bloodCount,
      clubName,
      bloodBagPhotoUri: bloodBagPhoto ? bloodBagPhoto.uri : null, // Get URI if photo exists
      qrCodeDetails: qrResult,
    };

    console.log('Donation Details Submitted:', donationDetails); // Log data for debugging
    Alert.alert('Submission Successful', 'Donation details have been submitted!'); // User feedback

    // Optionally, you can reset the form fields here after successful submission
    // setDonationType('');
    // setHealthIssues('');
    // setAllergies('');
    // setLastDonatedDate(new Date());
    // setAge('');
    // setWeight('');
    // setBloodPressure('');
    // setBloodCount('');
    // setClubName('');
    // setBloodBagPhoto(null);
    // setQrResult('');
  };

  // If showScanner is true, render only the QRScanner component
  // This makes the QR scanner take up the full screen when active
  if (showScanner) {
    return (
      <QRScanner
        onScanSuccess={(value) => {
          setQrResult(value);     // Store the scanned QR value
          setShowScanner(false);  // Hide the scanner and return to the form
        }}
      />
    );
  }

  // Main component rendering the donation form
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Blood Donation Form</Text>

        

        {/* Section: Donation Details */}
        <Text style={styles.sectionTitle}>Donation Details</Text>
        <FormPicker
          iconName="hand-holding-heart"
          selectedValue={donationType}
          onValueChange={(value) => setDonationType(value)}
          items={[
            { label: 'Select Donation Type', value: '' },
            { label: 'Volunteer', value: 'volunteer' },
            { label: 'Patient Specific', value: 'patient_specific' },
            { label: 'Replacement', value: 'replacement' },
            { label: 'Autologous', value: 'autologous' },
          ]}
        />
        <FormPicker
          iconName="heartbeat"
          selectedValue={healthIssues}
          onValueChange={(value) => setHealthIssues(value)}
          items={[
            { label: 'Select Health Issue', value: '' },
            { label: 'None', value: 'none' },
            { label: 'Diabetes', value: 'diabetes' },
            { label: 'Hypertension', value: 'hypertension' },
            { label: 'Asthma', value: 'asthma' },
            { label: 'Heart Disease', value: 'heart_disease' },
          ]}
        />


        <FormInput
          iconName="allergies"
          placeholder="Allergies (e.g., penicillin, dust)"
          value={allergies}
          onChangeText={setAllergies}
          multiline // Allow multiple lines for allergies
        />

        {/* Last Donated Date Picker */}
        <View style={styles.dateRow}>
          <Text style={styles.dateLabel}>Last Donated Date:</Text>
          <Button
            title={lastDonatedDate.toDateString()} // Display the selected date
            onPress={() => setShowDatePicker(true)} // Show date picker on button press
            color="#007bff" // A pleasant blue for the button
          />
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={lastDonatedDate}
            mode="date"
            display="calendar" // or "spinner" or "default"
            onChange={handleDateChange}
          />

        )}

        <FormInput
          iconName="user-clock"
          placeholder="Age (years)"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric" // Ensure numeric input
          maxLength={3} // Max 3 digits for age
        />

        <FormInput
          iconName="weight"
          placeholder="Weight (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric" // Ensure numeric input
          maxLength={3} // Max 3 digits for weight
        />

        {/* Section: Test Results */}
        <Text style={styles.sectionTitle}>Test Results</Text>

        <FormInput
          iconName="tint"
          placeholder="Blood Pressure (e.g., 120/80 mmHg)"
          value={bloodPressure}
          onChangeText={setBloodPressure}
        />

        <FormInput
          iconName="vial"
          placeholder="Blood Count (e.g., 5.0 million/uL)"
          value={bloodCount}
          onChangeText={setBloodCount}
          keyboardType="numeric" // Can be numeric or decimal, adjust as needed
        />

        {/* Section: Club Details */}
        <Text style={styles.sectionTitle}>Club Details</Text>
        <FormInput
          iconName="users"
          placeholder="Club Name (if member of any club)"
          value={clubName}
          onChangeText={setClubName}
        />

        <Text style={styles.sectionTitle}>Upload Blood Bag Photo</Text>
          <ImagePicker
            profilePic={bloodBagPhoto}
            onImageSelected={setBloodBagPhoto}
          />

        {/* Section: QR Code Scanner for Blood Bag */}
        <Text style={styles.sectionTitle}>Scan Blood Bag QR Code</Text>
        <Button
          title="Scan QR Code"
          color="#28a745" // A green color for the scan button
          onPress={() => setShowScanner(true)} // Activate the QR scanner
        />

        {qrResult ? (
          <Text style={styles.scannedResultText}>
            Scanned QR Value: {qrResult}
          </Text>
        ) : null}

        {/* Submit Button */}
        <View style={styles.submitBtn}>
          <Button
            title="Submit Donation"
            onPress={handleSubmit}
            color="#003366" // Your primary app color
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// --- Stylesheet for the App component ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Light background for the whole screen
  },
  container: {
    padding: 16,
    paddingBottom: 40, // Add extra padding at the bottom for scrollability
  },
  title: {
    fontSize: 28, // Larger title for prominence
    fontWeight: 'bold',
    marginBottom: 25, // More space below title
    color: '#003366', // Dark blue for headings
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20, // Slightly larger section titles
    fontWeight: 'bold',
    marginVertical: 18, // More vertical spacing for sections
    color: '#003366',
    textAlign: 'center',
    borderBottomWidth: 1, // Add a subtle line under section titles
    borderBottomColor: '#e9ecef',
    paddingBottom: 8,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginHorizontal: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
  },
  dateLabel: {
    fontSize: 16,
    color: '#333',
  },
  scannedResultText: {
    marginTop: 15,
    fontSize: 16,
    color: '#003366',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#e6f7ff', // Light blue background for scanned result
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b3e0ff',
  },
  submitBtn: {
    marginTop: 30,
    marginBottom: 40,
    marginHorizontal: 4,
    borderRadius: 8,
    overflow: 'hidden', // Ensures button background respects border radius
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    marginLeft: 4,
  },
  dateInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
});

export default App;
