import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const NOMES = ['Ana Souza', 'Bruno Lima', 'Carla Dias'];

export default function App() {
  const [votos, setVotos] = useState([0, 0, 0]);
  const total = votos.reduce((a, b) => a + b, 0);
  const max = Math.max(...votos);
  const lideres = NOMES.filter((_, i) => votos[i] === max);

  const votar = (i) => setVotos(votos.map((v, k) => (k === i ? v + 1 : v)));

  let resultado = 'Nenhum voto registrado.';
  if (total > 0) {
    resultado = lideres.length > 1
      ? `Empate na liderança: ${lideres.join(' e ')} (${max} votos)`
      : `Mais votado: ${lideres[0]} (${max} votos)`;
  }

  return (
    <View style={s.c}>
      <Text style={s.t}>🗳️ Eleição estudantil</Text>
      {NOMES.map((n, i) => (
        <View key={n} style={s.card}>
          <View style={{ flex: 1 }}>
            <Text style={s.nome}>{n}</Text>
            <Text style={s.v}>{votos[i]} voto(s)</Text>
          </View>
          <Pressable style={s.b} onPress={() => votar(i)}><Text style={s.bt}>Votar</Text></Pressable>
        </View>
      ))}
      <Text style={s.r}>Total geral: {total} voto(s)</Text>
      <Text style={s.res}>{resultado}</Text>
      <Pressable onPress={() => setVotos([0, 0, 0])}><Text style={s.reset}>Zerar votação</Text></Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, padding: 24, paddingTop: 60, backgroundColor: '#f4f6fb' },
  t: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#1f2a44' },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 14, borderRadius: 10, marginBottom: 10 },
  nome: { fontSize: 18, fontWeight: '600', color: '#1f2a44' },
  v: { color: '#556', marginTop: 2 },
  b: { backgroundColor: '#3b6cf6', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 },
  bt: { color: '#fff', fontWeight: 'bold' },
  r: { fontSize: 18, marginTop: 16, fontWeight: '600', color: '#1f2a44' },
  res: { fontSize: 18, marginTop: 8, color: '#1e8449', fontWeight: '700' },
  reset: { marginTop: 20, color: '#c0392b', textAlign: 'center' },
});