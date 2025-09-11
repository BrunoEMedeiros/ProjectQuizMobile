import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useScoreViewModel from "@/ViewModel/useScoreVIewModel";

export default function ScorePage() {
    const { scoreCard, onSubmit, handleSubmit } = useScoreViewModel();

    return (
        <View style={styles.container}>
            {/* Score Card */}
            {scoreCard && (
                <View style={styles.elipseContainer}>
                    <View style={styles.elipse}>
                        <Text style={styles.acertosText}>{scoreCard.acertos}</Text>
                    </View>
                    <Text style={styles.userName}>{scoreCard.nome}</Text>
                    <Text style={styles.userPosition}>#{scoreCard.posicao ?? 1}</Text>
                </View>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingTop: 40,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    elipseContainer: {
        alignItems: "center",
    },
    elipse: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: "#f0f0f0",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    acertosText: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#333",
    },
    userName: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 4,
    },
    userPosition: {
        fontSize: 18,
        color: "#666",
    },
});