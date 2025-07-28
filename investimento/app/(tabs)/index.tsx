import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function App() {
  const [mensal, setMensal] = useState<string>('');
  const [meses, setMeses] = useState<string>('');
  const [juros, setJuros] = useState<string>('');
  const [montanteSimples, setMontanteSimples] = useState<string | null>(null);
  const [montanteComposto, setMontanteComposto] = useState<string | null>(null);

  const calcular = () => {
    const m = parseFloat(mensal.replace(',', '.'));
    const t = parseInt(meses);
    const i = parseFloat(juros.replace(',', '.')) / 100;

    if (isNaN(m) || isNaN(t) || isNaN(i)) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const montanteS = m * t;

    let montanteR = 0;
    for (let j = 1; j <= t; j++) {
      montanteR = montanteR + montanteR * i + m;
    }

    setMontanteSimples(montanteS.toFixed(2));
    setMontanteComposto(montanteR.toFixed(2));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>Simulador de Investimento</Text>

        <TextInput
          style={styles.input}
          placeholder="Valor mensal investido (R$)"
          keyboardType="numeric"
          value={mensal}
          onChangeText={setMensal}
        />

        <TextInput
          style={styles.input}
          placeholder="Número de meses"
          keyboardType="numeric"
          value={meses}
          onChangeText={setMeses}
        />

        <TextInput
          style={styles.input}
          placeholder="Taxa de juros mensal (%)"
          keyboardType="numeric"
          value={juros}
          onChangeText={setJuros}
        />

        <Button title="Calcular" onPress={calcular} />

        {montanteSimples && (
          <View style={styles.result}>
            <Text style={styles.resultText}>Montante sem juros: R$ {montanteSimples}</Text>
            <Text style={styles.resultText}>Montante com juros: R$ {montanteComposto}</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  result: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
