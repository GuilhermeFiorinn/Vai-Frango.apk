import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

// Importe seu layout de abas
import TabsLayout from "./components/TabsLayout";

/* Imports de CSS Core do Ionic */
import "@ionic/react/css/core.css";
// ... outros imports de CSS ...

setupIonicReact();

const App = () => (
	<IonApp>
		<IonReactRouter>
			<IonRouterOutlet>
				{/* A rota /tabs agora é gerenciada pelo seu componente TabsLayout */}
				<Route path="/tabs" render={() => <TabsLayout />} />

				{/* Redireciona a rota raiz "/" para a primeira aba */}
				<Route path="/" exact={true}>
					<Redirect to="/tabs/treino" />
				</Route>
			</IonRouterOutlet>
		</IonReactRouter>
	</IonApp>
);

export default App;