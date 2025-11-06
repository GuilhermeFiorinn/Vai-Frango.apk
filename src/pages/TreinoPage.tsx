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
      
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className="ion-text-center">Treino</IonTitle>
          </IonToolbar>
        </IonHeader>
        <TreinoDoDia />
        <TreinoRapido />

      </IonContent>
    </IonPage>
  );
}