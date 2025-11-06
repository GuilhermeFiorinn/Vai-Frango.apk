"use client";
import { useState } from "react";
import presetsData from "../data/preExercises.json";

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonCheckbox,
  IonNote,
} from "@ionic/react";


type ExercicioRapido = { id: number; nome: string; duracao: string; };
type PresetDeTreino = { id: number; nome: string; descricao?: string; exercicios: ExercicioRapido[]; };

// --- Sub-componente: Seleção de Preset ---
function SelecaoDePreset({ presets, onSelecionar }: { presets: PresetDeTreino[], onSelecionar: (preset: PresetDeTreino) => void }) {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle style={{ color: '#E6E6E6' }}>Escolha um Treino Rápido</IonCardTitle>  {/* Forçar cor de texto com style, n sei porque nao funciona com o css*/}

      </IonCardHeader>
      <IonCardContent>
        <IonList lines="full" inset={true}>
          {presets.map((preset) => (
            <IonItem
              button={true}
              key={preset.id}
              onClick={() => onSelecionar(preset)}
            >
              <IonLabel>
                <h2>{preset.nome}</h2>
                {preset.descricao && (
                  <IonNote>{preset.descricao}</IonNote>
                )}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
}

// --- Sub-componente: Exibição do Treino ---
function ExibicaoDeTreino({ preset, onVoltar }: { preset: PresetDeTreino, onVoltar: () => void }) {
  const [exerciciosConcluidos, setExerciciosConcluidos] = useState<Set<number>>(new Set());

  function handleToggleFinished(id: number) {
    const novosConcluidos = new Set(exerciciosConcluidos);
    if (novosConcluidos.has(id)) {
      novosConcluidos.delete(id);
    } else {
      novosConcluidos.add(id);
    }
    setExerciciosConcluidos(novosConcluidos);
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonItem lines="none" className="ion-no-padding">
          <IonCardTitle style={{ color: '#E6E6E6' }}>{preset.nome}</IonCardTitle> {/* Forçar cor de texto com style*/}
          <IonButton fill="clear" onClick={onVoltar} slot="end">
            Voltar
          </IonButton>
        </IonItem>
      </IonCardHeader>
      <IonCardContent>
        {!preset.exercicios || preset.exercicios.length === 0 ? (
          <IonNote>Este preset de treino ainda não contém exercícios.</IonNote>
        ) : (
          <IonList lines="full">
            {preset.exercicios.map((ex) => {
              const isFinished = exerciciosConcluidos.has(ex.id);
              return (
                <IonItem key={ex.id}>
                  <IonCheckbox
                    slot="start"
                    checked={isFinished}
                    onIonChange={() => handleToggleFinished(ex.id)}
                    aria-label={`Marcar ${ex.nome} como concluído`}
                  />
                  <IonLabel color={isFinished ? 'medium' : ''}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3>{ex.nome}</h3>
                      <IonNote slot="end" style={{ fontFamily: 'monospace' }}>
                        {ex.duracao}
                      </IonNote>
                    </div>
                  </IonLabel>
                </IonItem>
              );
            })}
          </IonList>
        )}
      </IonCardContent>
    </IonCard>
  );
}

// --- Componente Principal ---
export default function TreinoRapido() {
  const [presets] = useState<PresetDeTreino[]>(presetsData);
  const [presetSelecionado, setPresetSelecionado] = useState<PresetDeTreino | null>(null);

  if (presetSelecionado) {
    return (
      <ExibicaoDeTreino
        preset={presetSelecionado}
        onVoltar={() => setPresetSelecionado(null)}
      />
    );
  }
  return (
    <SelecaoDePreset
      presets={presets}
      onSelecionar={(preset) => setPresetSelecionado(preset)}
    />
  );
}