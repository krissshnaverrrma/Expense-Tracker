import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Linking,
	ScrollView,
	Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function ContactScreen() {
	const SOCIAL_LINKS = {
		email: "mailto:krishnav24-cs@sanskar.org",
		github: "https://github.com/krissshnaverrrma",
		linkedin: "https://www.linkedin.com/in/krishna-verma-43aa85315/",
		phone: "tel:+919258846075",
	};
	const openLink = async (url) => {
		const supported = await Linking.canOpenURL(url);
		if (supported) {
			await Linking.openURL(url);
		} else {
			Alert.alert("Error", "Cannot open this link: " + url);
		}
	};
	return (
		<ScrollView
			style={styles.container}
			showsVerticalScrollIndicator={false}
		>
			<Text style={styles.headerTitle}>Contact & Support</Text>
			<Text style={styles.headerSubtitle}>
				Need help or want to connect? Reach out through any of the
				options below.
			</Text>
			{/* 2. DIRECT CONTACT OPTIONS */}
			<Text style={styles.sectionLabel}>Direct Contact</Text>
			{/* Email Button */}
			<TouchableOpacity
				style={styles.card}
				onPress={() => openLink(SOCIAL_LINKS.email)}
			>
				<View style={[styles.iconBox, { backgroundColor: "#FFEEBEE" }]}>
					<Ionicons name="mail" size={24} color="#F44336" />
				</View>
				<View style={styles.cardContent}>
					<Text style={styles.cardTitle}>Email Me</Text>
					<Text style={styles.cardText}>
						Get a response within 24h
					</Text>
				</View>
				<Ionicons name="chevron-forward" size={20} color="#ccc" />
			</TouchableOpacity>
			{/* Phone Button (Optional) */}
			<TouchableOpacity
				style={styles.card}
				onPress={() => openLink(SOCIAL_LINKS.phone)}
			>
				<View style={[styles.iconBox, { backgroundColor: "#E8F5E9" }]}>
					<Ionicons name="call" size={24} color="#4CAF50" />
				</View>
				<View style={styles.cardContent}>
					<Text style={styles.cardTitle}>Call Support</Text>
					<Text style={styles.cardText}>Mon-Fri, 9am - 5pm</Text>
				</View>
				<Ionicons name="chevron-forward" size={20} color="#ccc" />
			</TouchableOpacity>
			{/* 3. SOCIAL PROFILES */}
			<Text style={styles.sectionLabel}>Follow Me</Text>
			{/* GitHub */}
			<TouchableOpacity
				style={styles.card}
				onPress={() => openLink(SOCIAL_LINKS.github)}
			>
				<View style={[styles.iconBox, { backgroundColor: "#212121" }]}>
					<Ionicons name="logo-github" size={24} color="#fff" />
				</View>
				<View style={styles.cardContent}>
					<Text style={styles.cardTitle}>GitHub Profile</Text>
					<Text style={styles.cardText}>
						View Source Code & Projects
					</Text>
				</View>
				<Ionicons name="open-outline" size={20} color="#ccc" />
			</TouchableOpacity>
			{/* LinkedIn */}
			<TouchableOpacity
				style={styles.card}
				onPress={() => openLink(SOCIAL_LINKS.linkedin)}
			>
				<View style={[styles.iconBox, { backgroundColor: "#0077B5" }]}>
					<Ionicons name="logo-linkedin" size={24} color="#fff" />
				</View>
				<View style={styles.cardContent}>
					<Text style={styles.cardTitle}>LinkedIn</Text>
					<Text style={styles.cardText}>
						Let's Connect Professionally
					</Text>
				</View>
				<Ionicons name="open-outline" size={20} color="#ccc" />
			</TouchableOpacity>
			{/* 4. APP INFO FOOTER */}
			<View style={styles.footerBox}>
				<Ionicons name="code-slash" size={20} color="#999" />
				<Text style={styles.footerText}>Expense Tracker Advanced</Text>
			</View>
			<View style={{ height: 50 }} />
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F7FA",
		padding: 20,
		paddingTop: 60,
	},
	headerTitle: {
		fontSize: 28,
		fontWeight: "800",
		color: "#1a1a1a",
		marginBottom: 5,
	},
	headerSubtitle: {
		fontSize: 16,
		color: "#666",
		lineHeight: 22,
		marginBottom: 25,
	},

	sectionLabel: {
		fontSize: 13,
		fontWeight: "bold",
		color: "#999",
		marginBottom: 15,
		marginTop: 10,
		textTransform: "uppercase",
		letterSpacing: 1,
	},
	card: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 16,
		marginBottom: 12,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 5,
	},
	iconBox: {
		width: 48,
		height: 48,
		borderRadius: 14,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 15,
	},
	cardContent: { flex: 1 },
	cardTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
	cardText: { fontSize: 13, color: "#888", marginTop: 2 },
	footerBox: { alignItems: "center", marginTop: 30, opacity: 0.6 },
	footerText: { color: "#666", marginTop: 5, fontSize: 12 },
});
