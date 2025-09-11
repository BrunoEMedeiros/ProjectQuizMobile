import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function Header() {
    return (
        <View style={styles.header}>
            <Image 
                style={styles.headerLogo}
                source={{ uri: 'https://your-logo-url.com/logo.png' }}
            />
            <TouchableOpacity style={styles.headerButton} onPress={() => { }}>
                <Text style={styles.headerButtonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#e6f2ff",
        paddingVertical: 19,
        paddingHorizontal: 16,
        borderRadius: 12,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    headerButton: {
        backgroundColor: "#4d94ff",
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    headerButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    headerLogo: {
        width: 100,
        height: 40,
        resizeMode: "contain",
    },
});