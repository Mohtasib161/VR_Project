import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  const studentData = {
    name: 'Jane Doe',
    id: 'STU-2026-0812',
    email: 'jane.doe@university.edu',
    major: 'Virtual Reality Development',
    semester: '4th Semester',
    gpa: '3.92',
    status: 'Approved',
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.avatarSection}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.studentName}>{studentData.name}</Text>
        <Text style={styles.studentId}>{studentData.id}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusBadgeText}>✓ {studentData.status}</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.cardHeader}>Academic Details</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Field of Study</Text>
          <Text style={styles.infoValue}>{studentData.major}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Current Term</Text>
          <Text style={styles.infoValue}>{studentData.semester}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Grade Point Average</Text>
          <Text style={styles.infoValueHighlight}>{studentData.gpa} / 4.00</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.cardHeader}>Contact Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email Address</Text>
          <Text style={styles.infoValue}>{studentData.email}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable 
          style={({ pressed }) => [styles.backButton, pressed && styles.buttonPressed]} 
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back Home</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  contentContainer: {
    padding: 24,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 8,
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#1E293B',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  avatarText: {
    color: '#F8FAFC',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: 1,
  },
  studentName: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  studentId: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  statusBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  statusBadgeText: {
    color: '#34D399',
    fontSize: 12,
    fontWeight: '700',
  },
  infoCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardHeader: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: 'column',
    gap: 4,
  },
  infoLabel: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  infoValue: {
    color: '#E2E8F0',
    fontSize: 15,
    fontWeight: '500',
  },
  infoValueHighlight: {
    color: '#F59E0B',
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 14,
  },
  buttonContainer: {
    marginTop: 12,
  },
  backButton: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  buttonPressed: {
    backgroundColor: '#334155',
  },
  backButtonText: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
  },
});
