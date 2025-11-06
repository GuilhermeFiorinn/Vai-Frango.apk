import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";

import Profile from "../components/Perfil";
import AppBanner from "../components/AppBanner";
import profileData from "../data/perfil.json";

const PerfilPage: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<AppBanner /> {/* Só o banner */}
			</IonHeader>
			<IonContent fullscreen className="ion-padding">
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large" className="ion-text-center">Perfil</IonTitle>
					</IonToolbar>
				</IonHeader>
				
				{/* O componente é renderizado diretamente */}
				<Profile /> 
			</IonContent>
		</IonPage>
	);
};

export default PerfilPage;