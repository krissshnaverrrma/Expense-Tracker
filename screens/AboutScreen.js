import React from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function AboutScreen() {
	return (
		<ScrollView
			style={styles.container}
			showsVerticalScrollIndicator={false}
		>
			{/* 1. APP HEADER / LOGO AREA */}
			<View style={styles.headerSection}>
				<View style={styles.logoContainer}>
					<Ionicons name="wallet" size={60} color="#000000ff" />
				</View>
				<Text style={styles.appName}>
					Expense Tracker <Text style={styles.proTag}>Advanced</Text>
				</Text>
				<Text style={styles.version}>Version 1.0.0 (Build 2025)</Text>
			</View>
			{/* 2. MAIN DESCRIPTION */}
			<View style={styles.card}>
				<Text style={styles.cardTitle}>About the App</Text>
				<Text style={styles.cardText}>
					Expense Tracker Advanced is an offline-first financial
					management tool designed for speed and privacy. Unlike other
					apps, your data never leaves your device. We use advanced
					local storage to ensure your financial details remain 100%
					private and secure.
				</Text>
			</View>
			{/* 3. KEY FEATURES (Grid Layout) */}
			<Text style={styles.sectionHeader}>Key Features</Text>
			<View style={styles.featureGrid}>
				{/* Feature 1 */}
				<View style={styles.featureItem}>
					<Ionicons
						name="shield-checkmark"
						size={28}
						color="#4CAF50"
					/>
					<Text style={styles.featureTitle}>100% Secure</Text>
					<Text style={styles.featureDesc}>Offline Storage</Text>
				</View>
				{/* Feature 2 */}
				<View style={styles.featureItem}>
					<Ionicons name="pie-chart" size={28} color="#FF9800" />
					<Text style={styles.featureTitle}>Analytics</Text>
					<Text style={styles.featureDesc}>Smart Charts</Text>
				</View>
				{/* Feature 3 */}
				<View style={styles.featureItem}>
					<Ionicons name="globe" size={28} color="#2196F3" />
					<Text style={styles.featureTitle}>Global</Text>
					<Text style={styles.featureDesc}>Multi-Currency</Text>
				</View>
				{/* Feature 4 */}
				<View style={styles.featureItem}>
					<Ionicons name="flash" size={28} color="#3ab7a2ff" />
					<Text style={styles.featureTitle}>Fast</Text>
					<Text style={styles.featureDesc}>Zero Latency</Text>
				</View>
			</View>
			{/* 4. LEGAL / FOOTER */}
			<View style={styles.footer}>
				<Text style={styles.footerText}>
					Designed & Developed by Krishna Verma
				</Text>
				<Text style={styles.footerCopyright}>
					© 2025 All Rights Reserved
				</Text>
			</View>
			<View style={{ height: 50 }} />
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#F5F7FA", padding: 20 },
	headerSection: { alignItems: "center", marginTop: 40, marginBottom: 30 },
	logoContainer: {
		width: 100,
		height: 100,
		backgroundColor: "#E3F2FD",
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 15,
	},
	appName: { fontSize: 24, fontWeight: "800", color: "#1a1a1a" },
	proTag: { color: "#2196F3", fontSize: 14, fontWeight: "bold" },
	version: { color: "#888", marginTop: 5, fontSize: 14 },
	card: {
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 20,
		marginBottom: 25,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 2,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#333",
	},
	cardText: { fontSize: 15, lineHeight: 24, color: "#555" },
	sectionHeader: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 15,
		marginLeft: 5,
		color: "#333",
	},
	featureGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	featureItem: {
		backgroundColor: "#fff",
		width: "48%",
		padding: 20,
		borderRadius: 20,
		marginBottom: 15,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
	},
	featureTitle: {
		fontWeight: "bold",
		marginTop: 10,
		marginBottom: 2,
		fontSize: 15,
	},
	featureDesc: { color: "#999", fontSize: 12 },
	footer: { alignItems: "center", marginTop: 20, paddingBottom: 20 },
	footerText: { color: "#1a1a1a", fontWeight: "600", marginBottom: 5 },
	footerCopyright: { color: "#aaa", fontSize: 12 },
});
