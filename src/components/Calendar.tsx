"use client";
import { useEffect, useMemo, useState } from "react";
import { 
  Exercise, 
  addExercise, 
  removeExercise, 
  loadEvents, 
  saveEvents 
} from "../lib/exercices"; // Corrigido de "exercices"

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
  IonSpinner,
  IonNote // Adicionado para substituir <p>
} from "@ionic/react";

import { close } from "ionicons/icons";
import presetsData from "../data/exercises.json"; 

function formatKey(d: Date) {
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
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

  // ... (useEffect de carregar e salvar estão corretos) ...
  useEffect(() => {
    async function loadData() {
      const data = await loadEvents();
      setEvents(data);
      setLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!loading) {
      saveEvents(events);
    }
  }, [events, loading]);

  // ... (useMemo de highlightedDates está correto) ...
  const highlightedDates = useMemo(() => {
    return Object.keys(events)
      .filter(key => events[key] && events[key].length > 0)
      .map(dateKey => {
        return {
          date: dateKey,
          textColor: "#DB8237",
          backgroundColor: "#fef0e7",
        };
      });
  }, [events]);

  // ... (Funções handleDayClick, Modais, add/remove estão corretas) ...
  function handleDayClick(isoDateString: string | string[] | null | undefined) {
    if (!isoDateString || typeof isoDateString !== 'string') return;
    const date = new Date(isoDateString);
    const key = formatKey(date); // Usando a nova função formatKey
    if (selected && formatKey(selected) === key) {
      setSelected(null);
    } else {
      setSelected(date);
    }
  }
  function openAddModalForSelected() {
    if (!selected) return;
    setIsModalOpen(true);
    setNewExerciseName("");
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  function addExerciseFor(date: Date, presetId: number) {
    const preset = presets.find(p => p.id === presetId);
    if (!preset) return;
    const key = formatKey(date); // Usando a nova função formatKey
    const duration = preset.duracaoMinutos ? `${preset.duracaoMinutos} min` : "";
    setEvents(prev => addExercise(prev, key, { name: preset.nome, duration, finished: false }));
    setNewExerciseName("");
    closeModal();
  }
  function removeEvent(dateKey: string, index: number) {
    setEvents(prev => removeExercise(prev, dateKey, index));
  }
    
  const scheduledDays = Object.keys(events)
    .filter(key => events[key] && events[key].length > 0)
    .sort();
  
  // Renderiza um spinner...
  if (loading) {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '80px'}}>
        <IonSpinner name="crescent" />
      </div>
    );
  }

  // Renderização principal
  return (
    <>
      <style>
        {`
          ion-datetime::part(calendar) {
            background: #322B28; 
          }
        `}
      </style>

      {/* 1. O CALENDÁRIO NATIVO */}
      <IonDatetime
        presentation="date"
        highlightedDates={highlightedDates}
        onIonChange={(e) => handleDayClick(e.detail.value)}
        locale="pt-BR"
        firstDayOfWeek={0} // 0 = Domingo
      />
      
      {/* --- MUDANÇA: TEXTO INSTRUCIONAL --- */}
      <IonNote style={{
        color: '#9E9D9D', // Sua cor de sub-texto
        textAlign: 'center',
        display: 'block',
        marginTop: '10px'
      }}>
        Clique em um dia para marcar um Exercício
      </IonNote>
      
      {/* 2. BOTÃO DE ADICIONAR */}
      {selected && (
        <IonButton 
          expand="block" 
          onClick={openAddModalForSelected}
          style={{marginTop: '16px', marginLeft: '16px', marginRight: '16px'}}
        >
          Adicionar Treino para {selected.toLocaleDateString("pt-BR", { day: '2-digit', month: 'short' })}
        </IonButton>
      )}

      {/* 3. A LISTA "AGENDA DE TREINOS" */}
      <div style={{paddingTop: '16px'}}>
        <h2 style={{
            color: '#E6E6E6', 
            fontSize: '1.25rem', 
            fontWeight: 'bold', 
            paddingLeft: '16px', 
            paddingRight: '16px',
            marginBottom: '10px'
        }}>
          Agenda de Treinos
        </h2>
        
        {scheduledDays.length === 0 && (
          <IonNote style={{paddingLeft: '16px', paddingRight: '16px'}}>
            Nenhum exercício agendado.
          </IonNote>
        )}
        
        <IonList inset={true} lines="none" style={{padding: 0}}>
          {scheduledDays.map(dateKey => {
            const date = new Date(dateKey + 'T12:00:00Z');
            const exercisesForDay = events[dateKey];
            return (
              <IonCard key={dateKey} style={{marginBottom: '16px'}}>
                <IonCardHeader>
                  <IonCardTitle style={{fontWeight: '600', fontSize: '1rem', color: '#DB8237'}}>
                    {date.toLocaleDateString("pt-BR", { weekday: 'long', day: '2-digit', month: 'long' })}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent style={{padding: 0}}>
                  {exercisesForDay.map((exercise, index) => (
                    <IonItem key={index} lines={index === exercisesForDay.length - 1 ? "none" : "inset"}>
                      <IonLabel>
                        {/* --- MUDANÇA: COR DO TEXTO DA LISTA --- */}
                        <h3 style={{color: '#E6E6E6'}}>{exercise.name}</h3>
                        {exercise.duration && (
                          <p style={{color: '#9E9D9D'}}>{exercise.duration}</p>
                        )}
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
            <h3 style={{
                color: '#E6E6E6', 
                fontSize: '1.25rem', 
                fontWeight: '500', 
                marginBottom: '12px'
            }}>
              Adicionar exercício
            </h3>
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
              style={{marginTop: '16px'}}
            >
              Adicionar
            </IonButton>
        </IonContent>
      </IonModal>
    </>
  );
}