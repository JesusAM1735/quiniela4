import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const partidos = [
  'México vs Turquía',
  'Bolivia vs Chile',
  'Argentina vs Colombia',
  'Perú vs Ecuador',
  'Real Oviedo vs Almería',
  'Mirandés vs Racing Santander',
  'Fortaleza vs Santos',
  'Gremio vs Corinthians',
  'Sao Paulo vs Vasco da Gama'
];

export default function QuinielaApp() {
  const [nombre, setNombre] = useState('');
  const [quiniela, setQuiniela] = useState(Array(partidos.length).fill(''));
  const [quinielas, setQuinielas] = useState([]);

  // Simular base de datos en localStorage
  useEffect(() => {
    const stored = localStorage.getItem('quinielas');
    if (stored) setQuinielas(JSON.parse(stored));
  }, []);

  const guardarQuiniela = () => {
    if (!nombre.trim()) return alert('Ingresa tu nombre');
    const nueva = { nombre, pronosticos: quiniela };
    const actualizadas = [...quinielas.filter(q => q.nombre !== nombre), nueva];
    setQuinielas(actualizadas);
    localStorage.setItem('quinielas', JSON.stringify(actualizadas));
    alert('¡Quiniela guardada!');
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Quiniela Media Semana</h1>

      <Card className="mb-6">
        <CardContent className="p-4 space-y-4">
          <Input
            placeholder="Tu nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
          {partidos.map((p, i) => (
            <div key={i}>
              <Label>{`Partido ${i + 1}: ${p}`}</Label>
              <RadioGroup
                defaultValue={quiniela[i]}
                onValueChange={(val) => {
                  const copia = [...quiniela];
                  copia[i] = val;
                  setQuiniela(copia);
                }}
                className="flex gap-4 mt-1"
              >
                <RadioGroupItem value="L" id={`L${i}`} />
                <Label htmlFor={`L${i}`}>L</Label>
                <RadioGroupItem value="E" id={`E${i}`} />
                <Label htmlFor={`E${i}`}>E</Label>
                <RadioGroupItem value="V" id={`V${i}`} />
                <Label htmlFor={`V${i}`}>V</Label>
              </RadioGroup>
            </div>
          ))}
          <Button onClick={guardarQuiniela}>Enviar Quiniela</Button>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-2">Quinielas Registradas</h2>
      <div className="overflow-auto">
        <table className="w-full border text-sm">
          <thead>
            <tr>
              <th className="border px-2 py-1">#</th>
              <th className="border px-2 py-1">Participante</th>
              {partidos.map((_, i) => (
                <th key={i} className="border px-2 py-1">{i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {quinielas.map((q, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-1 text-center">{idx + 1}</td>
                <td className="border px-2 py-1">{q.nombre}</td>
                {q.pronosticos.map((res, i) => (
                  <td key={i} className="border px-2 py-1 text-center">{res}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

