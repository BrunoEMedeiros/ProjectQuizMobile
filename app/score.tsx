import useScoreViewModel from "@/ViewModel/useScoreVIewModel"
import { Controller } from "react-hook-form";
import { Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

const ScorePage = () => {
    const {
        control,
        handleSubmit,
        errors,
        onSubmit,
        scoreCard,
    } = useScoreViewModel();

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>Registrar Pontuação</Text>

                {/* Nome */}
                <Controller
                    control={control}
                    name="nome"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o nome do usuário"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.nome && <Text style={styles.error}>{errors.nome.message}</Text>}

                <Button title="Consultar Acertos" onPress={handleSubmit(onSubmit)} />

                {/* Score Card */}
                {scoreCard && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Score Card</Text>
                        <Text>Acertos: {scoreCard.acertos}</Text>
                        <Text>Nome: {scoreCard.nome}</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default ScorePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    error: {
        color: "red",
        marginBottom: 8,
    },
    card: {
        marginTop: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
})
