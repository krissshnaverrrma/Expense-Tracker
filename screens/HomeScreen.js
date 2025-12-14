import React, { useState, useEffect, useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Modal,
	FlatList,
	Alert,
	Animated,
	LayoutAnimation,
	Platform,
	UIManager,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PieChart } from "react-native-gifted-charts";
import { Ionicons } from "@expo/vector-icons";
if (Platform.OS === "android") {
	if (UIManager.setLayoutAnimationEnabledExperimental) {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}
}
export const CURRENCIES = [
	{ symbol: "$", name: "USD", flag: "🇺🇸" },
	{ symbol: "₹", name: "INR", flag: "🇮🇳" },
	{ symbol: "€", name: "EUR", flag: "🇪🇺" },
	{ symbol: "£", name: "GBP", flag: "🇬🇧" },
];
const CurrencySelector = ({ visible, onClose, onSelect, currentCurrency }) => (
	<Modal
		animationType="slide"
		transparent={true}
		visible={visible}
		onRequestClose={onClose}
	>
		<View style={styles.modalOverlay}>
			<View style={styles.modalContent}>
				<Text style={styles.modalTitle}>Select Currency</Text>
				<FlatList
					data={CURRENCIES}
					keyExtractor={(item) => item.name}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={[
								styles.currencyItem,
								item.symbol === currentCurrency.symbol &&
									styles.selectedCurrency,
							]}
							onPress={() => {
								onSelect(item);
								onClose();
							}}
						>
							<Text style={styles.currencyText}>
								{item.flag} {item.name} ({item.symbol})
							</Text>
						</TouchableOpacity>
					)}
				/>
				<TouchableOpacity style={styles.closeButton} onPress={onClose}>
					<Text style={styles.closeButtonText}>Close</Text>
				</TouchableOpacity>
			</View>
		</View>
	</Modal>
);
export default function HomeScreen({ currency, setCurrency }) {
	const [balance, setBalance] = useState(0);
	const [transactions, setTransactions] = useState([]);
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const slideAnim = useRef(new Animated.Value(0)).current;
	const income = transactions
		.filter((t) => t.amount > 0)
		.reduce((acc, t) => acc + t.amount, 0);
	const expense = transactions
		.filter((t) => t.amount < 0)
		.reduce((acc, t) => acc + Math.abs(t.amount), 0);
	const pieData = [
		{ value: income || 1, color: "#4CAF50", text: "Income" },
		{ value: expense || 1, color: "#F44336", text: "Expense" },
	];
	useEffect(() => {
		loadData();
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}),
			Animated.spring(slideAnim, {
				toValue: 0,
				friction: 6,
				useNativeDriver: true,
			}),
		]).start();
	}, []);
	useEffect(() => {
		saveData();
	}, [transactions, balance, currency]);
	const saveData = async () => {
		try {
			await AsyncStorage.setItem(
				"transactions",
				JSON.stringify(transactions)
			);
			await AsyncStorage.setItem("balance", balance.toString());
			await AsyncStorage.setItem("currency", JSON.stringify(currency));
		} catch (e) {
			console.error(e);
		}
	};
	const loadData = async () => {
		try {
			const savedTransactions = await AsyncStorage.getItem(
				"transactions"
			);
			const savedBalance = await AsyncStorage.getItem("balance");
			const savedCurrency = await AsyncStorage.getItem("currency");
			if (savedTransactions)
				setTransactions(JSON.parse(savedTransactions));
			if (savedBalance) setBalance(parseFloat(savedBalance));
			if (savedCurrency) setCurrency(JSON.parse(savedCurrency));
		} catch (e) {
			console.error(e);
		}
	};
	const addTransaction = () => {
		if (!description || !amount) {
			Alert.alert("Error", "Please enter description and amount");
			return;
		}
		const val = parseFloat(amount);
		if (isNaN(val)) {
			Alert.alert("Error", "Please enter a valid number");
			return;
		}
		const newTransaction = {
			id: Date.now().toString(),
			description,
			amount: val,
			date: new Date().toLocaleDateString(),
		};
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
		setTransactions([newTransaction, ...transactions]);
		setBalance(balance + val);
		setDescription("");
		setAmount("");
	};
	const confirmDelete = (id, amount) => {
		Alert.alert(
			"Delete Transaction",
			"Are you sure you want to remove this?",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: () => deleteTransaction(id, amount),
				},
			]
		);
	};
	const deleteTransaction = (id, amountToDelete) => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
		const updatedTransactions = transactions.filter((t) => t.id !== id);
		setTransactions(updatedTransactions);
		setBalance(balance - amountToDelete);
	};
	return (
		<View style={styles.container}>
			<View style={styles.appHeaderRow}>
				<Text style={styles.appTitle}>Expense Tracker</Text>
			</View>
			<View style={styles.balanceHeader}>
				<View>
					<Text style={styles.greeting}>Total Balance</Text>
					<Text style={styles.balanceText}>
						{currency.symbol}
						{balance.toFixed(2)}
					</Text>
				</View>
				<TouchableOpacity
					style={styles.currencyBadge}
					onPress={() => setModalVisible(true)}
				>
					<Text style={styles.currencyBadgeText}>
						{currency.flag} {currency.name}
					</Text>
				</TouchableOpacity>
			</View>
			<Animated.ScrollView
				showsVerticalScrollIndicator={false}
				style={{
					opacity: fadeAnim,
					transform: [{ translateY: slideAnim }],
				}}
			>
				<View style={styles.card}>
					<Text style={styles.cardTitle}>Cash Flow</Text>
					<View style={{ alignItems: "center", marginVertical: 10 }}>
						<PieChart
							data={pieData}
							donut
							radius={80}
							innerRadius={60}
							showText
							textColor="black"
						/>
					</View>
					<View style={styles.statsRow}>
						<Text style={[styles.statText, { color: "#4CAF50" }]}>
							Income: {currency.symbol}
							{income}
						</Text>
						<Text style={[styles.statText, { color: "#F44336" }]}>
							Expense: {currency.symbol}
							{expense}
						</Text>
					</View>
				</View>
				<Text style={styles.sectionTitle}>New Entry</Text>
				<View style={styles.inputRow}>
					<TextInput
						style={[styles.input, { flex: 2 }]}
						placeholder="Description"
						value={description}
						onChangeText={setDescription}
					/>
					<TextInput
						style={[styles.input, { flex: 1 }]}
						placeholder="-50 / +100"
						keyboardType="numeric"
						value={amount}
						onChangeText={setAmount}
					/>
				</View>
				<TouchableOpacity
					style={styles.addButton}
					onPress={addTransaction}
				>
					<Text style={styles.addButtonText}>Add Transaction</Text>
				</TouchableOpacity>
				<Text style={styles.sectionTitle}>Recent History</Text>
				{transactions.map((t) => (
					<View key={t.id} style={styles.transactionCard}>
						<View style={styles.tInfo}>
							<Text style={styles.tDesc}>{t.description}</Text>
							<Text style={styles.tDate}>{t.date}</Text>
						</View>
						<View style={styles.tRight}>
							<Text
								style={[
									styles.tAmount,
									{
										color:
											t.amount > 0
												? "#4CAF50"
												: "#F44336",
									},
								]}
							>
								{t.amount > 0 ? "+" : ""}
								{currency.symbol}
								{t.amount.toFixed(2)}
							</Text>
							{/* DELETE BUTTON */}
							<TouchableOpacity
								onPress={() => confirmDelete(t.id, t.amount)}
								style={styles.deleteBtn}
							>
								<Ionicons
									name="trash-outline"
									size={20}
									color="#FF5252"
								/>
							</TouchableOpacity>
						</View>
					</View>
				))}
				<View style={{ height: 100 }} />
			</Animated.ScrollView>
			<CurrencySelector
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				currentCurrency={currency}
				onSelect={setCurrency}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F7FA",
		paddingTop: 60,
		paddingHorizontal: 20,
	},
	appHeaderRow: { marginBottom: 10 },
	appTitle: {
		fontSize: 28,
		fontWeight: "800",
		color: "#1a1a1a",
		letterSpacing: 0.5,
	},
	balanceHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	greeting: { fontSize: 16, color: "#666", marginBottom: 5 },
	balanceText: { fontSize: 36, fontWeight: "bold", color: "#212121" },
	currencyBadge: {
		backgroundColor: "#E3F2FD",
		paddingVertical: 8,
		paddingHorizontal: 15,
		borderRadius: 20,
	},
	currencyBadgeText: { color: "#000000ff", fontWeight: "bold" },
	card: {
		backgroundColor: "#ffffffff",
		borderRadius: 24,
		padding: 20,
		marginBottom: 25,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
	},
	cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
	statsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 15,
		paddingHorizontal: 10,
	},
	statText: { fontSize: 16, fontWeight: "bold" },
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 15,
		color: "#333",
	},
	inputRow: { flexDirection: "row", gap: 12, marginBottom: 15 },
	input: {
		backgroundColor: "#fff",
		padding: 18,
		borderRadius: 16,
		fontSize: 16,
		borderWidth: 1,
		borderColor: "#f0f0f0",
	},
	addButton: {
		backgroundColor: "#1a1a1a",
		padding: 18,
		borderRadius: 16,
		alignItems: "center",
		marginBottom: 30,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
	},
	addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
	transactionCard: {
		backgroundColor: "#fff",
		padding: 18,
		borderRadius: 16,
		marginBottom: 12,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.03,
		shadowRadius: 4,
	},
	tInfo: { flex: 1 },
	tDesc: { fontSize: 16, fontWeight: "600", color: "#333" },
	tDate: { fontSize: 12, color: "#999", marginTop: 4 },
	tRight: { flexDirection: "row", alignItems: "center", gap: 15 },
	tAmount: { fontSize: 16, fontWeight: "bold" },
	deleteBtn: { padding: 5 },
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		backgroundColor: "#fff",
		width: "85%",
		padding: 25,
		borderRadius: 24,
		maxHeight: "50%",
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	currencyItem: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#f5f5f5",
	},
	selectedCurrency: { backgroundColor: "#E3F2FD", borderRadius: 12 },
	currencyText: { fontSize: 16, fontWeight: "500" },
	closeButton: { marginTop: 20, alignItems: "center", padding: 10 },
	closeButtonText: { color: "#F44336", fontWeight: "bold", fontSize: 16 },
});
