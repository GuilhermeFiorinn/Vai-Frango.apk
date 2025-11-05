"use client";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

// Importe seu banner
import AppBanner from "../components/AppBanner";

// Importe os dois componentes de treino
import TreinoDoDia from "../components/Treino";
import TreinoRapido from "../components/TreinoRap";

export default function TreinoPage() {
  return (
    <IonPage>
      <IonHeader>
        <AppBanner />
      </IonHeader>
      
      {/* --- CORREÇÃO: Adicionado 'className="ion-padding"' --- */}
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className="ion-text-center">Treino</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Este div é para o espaçamento VERTICAL, está correto */}
        <div className="space-y-12"> 
          <TreinoDoDia />
          <TreinoRapido />
        </div>
      </IonContent>
    </IonPage>
  );
}