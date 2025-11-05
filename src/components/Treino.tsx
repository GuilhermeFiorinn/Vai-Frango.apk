"use client";
import { useState, useEffect } from "react";
// 1. CORREÇÃO DE TYPO: "exercices" -> "exercises"
import { Exercise, loadEvents, saveEvents } from "../lib/exercices";
// 2. Importar componentes Ionic
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
  
  // 3. O useEffect agora usa loadEvents()
  useEffect(() => {
    async function buscarProximoTreino() {
      try {
        // 4. NÃO USA FETCH: Carrega do Capacitor Filesystem
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
        console.error(err);
      } finally {
        setCarregando(false);
      }
    }
    buscarProximoTreino();
  }, []);

  // 5. handleToggleFinished agora usa saveEvents()
  async function handleToggleFinished(exercicioIndex: number) {
    if (!treino || !dataDoTreino) return;

    const treinoOriginal = treino; // Salva o estado original
    const novoTreino = JSON.parse(JSON.stringify(treino)); // Copia profunda
    novoTreino[exercicioIndex].finished = !novoTreino[exercicioIndex].finished;
    
    setTreino(novoTreino); // 1. Atualização otimista da UI

    try {
      // 2. Salva no "banco de dados" (o JSON no dispositivo)
      const dateKey = formatKey(dataDoTreino);
      const allEvents = await loadEvents(); // Carrega o JSON inteiro
      allEvents[dateKey] = novoTreino;      // Atualiza só o dia relevante
      await saveEvents(allEvents);         // Salva o JSON inteiro de volta
    } catch (error) {
      console.error("Falha ao salvar o progresso:", error);
      setTreino(treinoOriginal); // 3. Reverte a UI em caso de falha
      alert("Não foi possível salvar seu progresso. Tente novamente.");
    }
  }

  // 6. Refatorado com componentes Ionic
  if (carregando) {
    return (
      <div className="w-full flex justify-center p-10">
        <IonSpinner name="crescent" />
      </div>
    );
  }
  if (erro) {
    return (
      <div className="text-center p-10">
        <IonNote color="danger">{erro}</IonNote>
      </div>
    );
  }
  if (!treino || !dataDoTreino) {
    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Tudo pronto para começar?</IonCardTitle>
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
  const previewExercicios = treino.slice(0, 3);

  // 7. Usando IonAccordionGroup e IonAccordion
  return (
    /* --- CORREÇÃO ---
     * Removemos "max-w-3xl mx-auto".
     * A Página agora cuida do padding.
    */
    <div className="ml-4 w-full">
      <h1 style={{marginLeft: '10px'}}>
        Treino do Dia
      </h1>
      <IonAccordionGroup>
        <IonAccordion value="treinoDoDia" className="shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
          <IonItem slot="header" lines="none">
            <IonLabel>
              <h2 className="text-2xl font-bold">{titulo}</h2>
              <p className="text-md text-gray-500 dark:text-gray-400 pt-4">
                Progresso: {exerciciosConcluidos}/{totalExercicios}
              </p>
            </IonLabel>
          </IonItem>
          
          {/* Conteúdo do Accordion (o que é mostrado ao expandir) */}
          <div className="ion-padding" slot="content">
            <IonList lines="full">
              {treino.map((exercicio, index) => (
                <IonItem key={index}>
                  <IonCheckbox
                    slot="start"
                    checked={exercicio.finished}
                    onIonChange={() => handleToggleFinished(index)}
                    aria-label={`Marcar ${exercicio.name} como concluído`}
                  />
                  <IonLabel 
                    className={`${exercicio.finished ? 'line-through text-gray-500' : ''}`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{exercicio.name}</h3>
                      {exercicio.duration && (
                        <p className="text-sm font-mono">{exercicio.duration}</p>
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