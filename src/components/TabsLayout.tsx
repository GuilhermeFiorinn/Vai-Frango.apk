import { Redirect, Route } from "react-router-dom";
import {
	IonRouterOutlet,
	IonTabs,
	IonTabBar,
	IonTabButton,
	IonIcon,
	IonLabel,
} from "@ionic/react";
import { calendar, person, barbell } from "ionicons/icons";

// 1. Importe suas páginas da pasta /pages/
import TreinoPage from "../pages/TreinoPage";
import AgendaPage from "../pages/AgendaPage";
import PerfilPage from "../pages/PerfilPage";

const TabsLayout = () => {
	return (
		<IonTabs>
			<IonRouterOutlet>
				{/* As rotas não mudam */}
				<Route path="/tabs/treino" component={TreinoPage} exact={true} />
				<Route path="/tabs/agenda" component={AgendaPage} exact={true} />
				<Route path="/tabs/perfil" component={PerfilPage} exact={true} />
				<Route path="/tabs" exact={true}>
					<Redirect to="/tabs/treino" />
				</Route>
			</IonRouterOutlet>

			{/* A TabBar não muda */}
			<IonTabBar slot="bottom">
				<IonTabButton tab="treino" href="/tabs/treino">
					<IonIcon icon={barbell} />
					<IonLabel>Treino</IonLabel>
				</IonTabButton>
				<IonTabButton tab="agenda" href="/tabs/agenda">
					<IonIcon icon={calendar} />
					<IonLabel>Agenda</IonLabel>
				</IonTabButton>
				<IonTabButton tab="perfil" href="/tabs/perfil">
					<IonIcon icon={person} />
					<IonLabel>Perfil</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	);
};

export default TabsLayout;