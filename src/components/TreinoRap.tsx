"use client";
import { useState, useEffect } from "react";
// 1. Importar o JSON diretamente
import presetsData from "../data/preExercises.json";
// 2. Importar componentes Ionic
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

// (Tipos permanecem os mesmos)
type ExercicioRapido = { id: number; nome: string; duracao: string; };
type PresetDeTreino = { id: number; nome: string; descricao?: string; exercicios: ExercicioRapido[]; };

// --- Sub-componente: Seleção de Preset (Ionic-ficado) ---
function SelecaoDePreset({ presets, onSelecionar }: { presets: PresetDeTreino[], onSelecionar: (preset: PresetDeTreino) => void }) {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle className="text-2xl">Escolha um Treino Rápido</IonCardTitle>
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
                <h2 className="font-bold text-lg">{preset.nome}</h2>
                {preset.descricao && <p className="text-sm">{preset.descricao}</p>}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
}

// --- Sub-componente: Exibição do Treino (Ionic-ficado) ---
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
          <IonCardTitle className="text-2xl">{preset.nome}</IonCardTitle>
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
                  <IonLabel className={`${isFinished ? 'line-through text-gray-500' : ''}`}>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{ex.nome}</h3>
                      <p className="text-sm font-mono">{ex.duracao}</p>
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

// --- Componente Principal (Ionic-ficado) ---
export default function TreinoRapido() {
  // 3. Carrega os presets do JSON importado, não mais do fetch
  const [presets] = useState<PresetDeTreino[]>(presetsData);
  const [presetSelecionado, setPresetSelecionado] = useState<PresetDeTreino | null>(null);
  
  // 4. Estados de carregando e erro removidos
  // (O useEffect de 'buscarPresets' foi removido)

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