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
			<IonContent fullscreen className="ion-padding">
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large" className="ion-text-center">Agenda</IonTitle>
					</IonToolbar>
				</IonHeader>
				<Calendar />
			</IonContent>
		</IonPage>
	);
};

export default AgendaPage;