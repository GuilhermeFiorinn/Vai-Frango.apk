import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";

import AppBanner from "../components/AppBanner";
import Calendar from "../components/Calendar"; 

const AgendaPage: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<AppBanner />
			</IonHeader>

			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large" className="ion-text-center">Agenda</IonTitle>
					</IonToolbar>
				</IonHeader>

				{/* * CORREÇÃO: 
				  * Removemos 'max-w-4xl', 'mx-auto', 'px-4', 'py-12'.
				  * Adicionamos 'ion-padding' (para espaçamento) e 'w-full'.
				  * 'w-full' dá ao componente Calendar um container de largura total 
				  * para que seu 'mx-auto' (se tiver) funcione.
				*/}
				<div className="ion-padding w-full">
					<Calendar />
				</div>
			</IonContent>
		</IonPage>
	);
};

export default AgendaPage;