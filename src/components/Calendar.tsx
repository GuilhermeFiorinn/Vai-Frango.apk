"use client";
import { useEffect, useMemo, useState } from "react";
import { 
  Exercise, 
  addExercise, 
  removeExercise, 
  loadEvents, 
  saveEvents 
} from "../lib/exercices";

// Importações do Ionic padroes junto com as para data do calendario
import {
  IonDatetime,
  IonModal,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonButtons,
  IonSpinner
} from "@ionic/react";

import { close } from "ionicons/icons";
import presetsData from "../data/exercises.json";

// Função utilitária SÓ para formatar a chave YYYY-MM-DD
function formatKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

// Tipagem
type Preset = { id: number; nome: string; duracaoMinutos?: number; };

export default function Calendar() {
  const [selected, setSelected] = useState<Date | null>(null);
  const [events, setEvents] = useState<Record<string, Exercise[]>>({});
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [newExerciseName, setNewExerciseName] = useState("");
  const [presets] = useState<Preset[]>(presetsData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Efeito para CARREGAR os dados do arquivo na primeira renderização
  useEffect(() => {
    async function loadData() {
      const data = await loadEvents();
      setEvents(data);
      setLoading(false);
    }
    loadData();
  }, []); // [] = roda só uma vez

  // Efeito para SALVAR os dados no arquivo sempre que 'events' mudar
  useEffect(() => {
    // Não salva se estivermos no estado de carregamento inicial
    if (!loading) {
      saveEvents(events);
    }
  }, [events, loading]); // Roda sempre que 'events' ou 'loading' mudar

  // 'useMemo' para MARCAR os dias no calendário
  const highlightedDates = useMemo(() => {
    return Object.keys(events)
      .filter(key => events[key] && events[key].length > 0)
      .map(dateKey => {
        return {
          date: dateKey, // 'YYYY-MM-DD'
          textColor: "#DB8237", // Cor da fonte
          backgroundColor: "#fef0e7", // Fundo do dia
        };
      });
  }, [events]);

  // Função para quando o usuário CLICA em um dia
  function handleDayClick(isoDateString: string | string[] | null | undefined) {
    if (!isoDateString || typeof isoDateString !== 'string') return;
    
    const date = new Date(isoDateString);
    const key = formatKey(date);
    
    if (selected && formatKey(selected) === key) {
      setSelected(null); // Des-seleciona se clicar de novo
    } else {
      setSelected(date);
    }
  }

  // Funções do Modal
  function openAddModalForSelected() {
    if (!selected) return;
    setIsModalOpen(true);
    setNewExerciseName("");
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  // Funções de Eventos
  function addExerciseFor(date: Date, presetId: number) {
    const preset = presets.find(p => p.id === presetId);
    if (!preset) return;
    const key = formatKey(date);
    const duration = preset.duracaoMinutos ? `${preset.duracaoMinutos} min` : "";
    
    // Atualiza o estado (o useEffect vai salvar)
    setEvents(prev => addExercise(prev, key, { name: preset.nome, duration, finished: false }));
    
    setNewExerciseName("");
    closeModal(); // Fecha o modal após adicionar
  }

  function removeEvent(dateKey: string, index: number) {
    // Atualiza o estado (o useEffect vai salvar)
    setEvents(prev => removeExercise(prev, dateKey, index));
  }
    
  // Lista de dias ordenados para a "Agenda de Treinos"
  const scheduledDays = Object.keys(events)
    .filter(key => events[key] && events[key].length > 0)
    .sort();
  
  // Renderiza um spinner enquanto os dados são carregados do arquivo
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center p-20">
        <IonSpinner name="crescent" />
      </div>
    );
  }

  // Renderização principal após o carregamento
  return (
    <>
      {/* 1. O CALENDÁRIO NATIVO */}
      <IonDatetime
        presentation="date"
        highlightedDates={highlightedDates}
        onIonChange={(e) => handleDayClick(e.detail.value)}
        locale="pt-BR"
        firstDayOfWeek={0} // 0 = Domingo
      />
      
      {/* 2. BOTÃO DE ADICIONAR (só aparece se um dia estiver selecionado) */}
      {selected && (
        <IonButton 
          expand="block" 
          onClick={openAddModalForSelected}
          className="ion-margin-top ion-margin-horizontal"
        >
          Adicionar Treino para {selected.toLocaleDateString("pt-BR", { day: '2-digit', month: 'short' })}
        </IonButton>
      )}

      {/* 3. A LISTA "AGENDA DE TREINOS" */}
      <div className="ion-padding-top">
        <h2 className="text-lg font-bold ion-padding-horizontal">Agenda de Treinos</h2>
        {scheduledDays.length === 0 && (
          <p className="ion-padding-horizontal text-gray-500">Nenhum exercício agendado.</p>
        )}
        <IonList inset={true} lines="none" className="ion-no-padding">
          {scheduledDays.map(dateKey => {
            const date = new Date(dateKey + 'T12:00:00Z'); // T12:00:00Z para evitar bugs de fuso
            const exercisesForDay = events[dateKey];
            return (
              <IonCard key={dateKey} className="ion-margin-bottom">
                <IonCardHeader>
                  <IonCardTitle className="font-semibold text-base text-[#DB8237]">
                    {date.toLocaleDateString("pt-BR", { weekday: 'long', day: '2-digit', month: 'long' })}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="ion-no-padding">
                  {exercisesForDay.map((exercise, index) => (
                    <IonItem key={index} lines={index === exercisesForDay.length - 1 ? "none" : "inset"}>
                      <IonLabel>
                        <h3>{exercise.name}</h3>
                        {exercise.duration && <p>{exercise.duration}</p>}
                        Sair
                      </IonLabel>
                      <IonButton fill="clear" color="danger" size="small" onClick={() => removeEvent(dateKey, index)} >
                        Remover
                      </IonButton>
                    </IonItem>
                  ))}
                </IonCardContent>
              </IonCard>
            );
          })}
        </IonList>
      </div>

      {/* 4. O MODAL DE ADICIONAR EXERCÍCIO */}
      <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{selected?.toLocaleDateString("pt-BR", { day: '2-digit', month: 'long' })}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={closeModal}>
                <IonIcon slot="icon-only" icon={close} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <div className="space-y-3">
              <div className="text-lg font-medium">Adicionar exercício</div>
              <IonItem>
                <IonLabel position="stacked">Exercício</IonLabel>
                <IonSelect
                  value={newExerciseName}
                  placeholder="Selecione um exercício"
                  onIonChange={(e) => setNewExerciseName(e.target.value)}
                >
                  {presets.map(p => (
                    <IonSelectOption key={p.id} value={String(p.id)}>
                      {p.nome} {p.duracaoMinutos ? `(${p.duracaoMinutos} min)` : ""}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonButton 
                expand="block" 
                onClick={() => { if (!selected) return; addExerciseFor(selected, Number(newExerciseName)); }}
                disabled={!newExerciseName}
                className="mt-4"
              >
                Adicionar
              </IonButton>
            </div>
        </IonContent>
      </IonModal>
    </>
  );
}