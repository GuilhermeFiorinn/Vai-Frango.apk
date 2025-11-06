"use client";
import { useState, useEffect } from "react";
// Import corrigido para o nome atual do arquivo
import { Exercise, loadEvents, saveEvents } from "../lib/exercices";
import {
  IonSpinner,
  IonNote,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonList,
  IonCheckbox,
} from "@ionic/react";

type CalendarEvents = Record<string, Exercise[]>;

function formatKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export default function TreinoDoDia() {
  const [treino, setTreino] = useState<Exercise[] | null>(null);
  const [dataDoTreino, setDataDoTreino] = useState<Date | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  
  useEffect(() => {
    async function buscarProximoTreino() {
      try {
        const eventos: CalendarEvents = await loadEvents();
        const hoje = new Date();
        const chaveHoje = formatKey(hoje);
        if (eventos[chaveHoje] && eventos[chaveHoje].length > 0) {
          setTreino(eventos[chaveHoje]);
          setDataDoTreino(hoje);
        } else {
          const chavesFuturas = Object.keys(eventos)
            .filter(key => key >= chaveHoje && eventos[key].length > 0)
            .sort();
          if (chavesFuturas.length > 0) {
            const proximaChave = chavesFuturas[0];
            setTreino(eventos[proximaChave]);
            setDataDoTreino(new Date(proximaChave + 'T12:00:00Z'));
          } else {
            setTreino(null);
          }
        }
      } catch (err) {
        setErro("Não foi possível buscar seu cronograma de treinos.");
      } finally {
        setCarregando(false);
      }
    }
    buscarProximoTreino();
  }, []);

  async function handleToggleFinished(exercicioIndex: number) {
    if (!treino || !dataDoTreino) return;
    const treinoOriginal = treino;
    const novoTreino = JSON.parse(JSON.stringify(treino));
    novoTreino[exercicioIndex].finished = !novoTreino[exercicioIndex].finished;
    setTreino(novoTreino);
    try {
      const dateKey = formatKey(dataDoTreino);
      const allEvents = await loadEvents();
      allEvents[dateKey] = novoTreino;
      await saveEvents(allEvents);
    } catch (error) {
      setTreino(treinoOriginal);
      alert("Não foi possível salvar seu progresso. Tente novamente.");
    }
  }

  // --- Renderização ---
  if (carregando) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', padding: '40px'}}>
        <IonSpinner name="crescent" />
      </div>
    );
  }
  if (erro) {
    return (
      <div style={{textAlign: 'center', padding: '40px'}}>
        <IonNote color="danger">{erro}</IonNote>
      </div>
    );
  }
  if (!treino || !dataDoTreino) {
    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle style={{color: '#E6E6E6'}}>Tudo pronto para começar?</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          Você ainda não agendou nenhum treino. Vá para a aba "Agenda" para planejar sua semana!
        </IonCardContent>
      </IonCard>
    );
  }

  const totalExercicios = treino.length;
  const exerciciosConcluidos = treino.filter(ex => ex.finished).length;
  const ehHoje = formatKey(dataDoTreino) === formatKey(new Date());
  const titulo = ehHoje ? "Treino de Hoje" : "Próximo Treino";

  return (
    <div style={{ marginBottom: '2rem' }}> 
      
      <IonCardTitle style={{
        textAlign: 'center', 
        marginBottom: '1.5rem', 
        fontSize: '2rem', 
        fontWeight: 'bold',
        color: '#E6E6E6' // Cor do texto principal
      }}>
        Treino do Dia
      </IonCardTitle>
      
      <IonAccordionGroup>
        <IonAccordion value="treinoDoDia">
          <IonItem slot="header" lines="none">
            <IonLabel>
              <h2>{titulo}</h2>
              <IonNote>
                Progresso: {exerciciosConcluidos}/{totalExercicios}
              </IonNote>
            </IonLabel>
          </IonItem>
          
          <div className="ion-padding" slot="content">
            <IonList lines="full">
              {treino.map((exercicio, index) => (
                <IonItem key={index}>
                  <IonCheckbox
                    slot="start"
                    checked={exercicio.finished}
                    onIonChange={() => handleToggleFinished(index)}
                  />
                  <IonLabel color={exercicio.finished ? 'medium' : ''}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3>{exercicio.name}</h3>
                      {exercicio.duration && (
                        <IonNote slot="end" style={{fontFamily: 'monospace'}}>
                          {exercicio.duration}
                        </IonNote>
                      )}
                    </div>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </div>
        </IonAccordion>
      </IonAccordionGroup>
    </div>
  );
}