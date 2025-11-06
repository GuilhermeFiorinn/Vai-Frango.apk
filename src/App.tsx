import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

// Importa layout de abas
import TabsLayout from "./components/TabsLayout";

/* Imports de CSS Core do Ionic e adicionais*/
import "@ionic/react/css/core.css";
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

import './theme/variables.css';
document.body.classList.add('dark'); /* Força o modo Dark pra ficar padrão */
setupIonicReact();

const App = () => (
	<IonApp>
		<IonReactRouter>
			<IonRouterOutlet>
				<Route path="/tabs" render={() => <TabsLayout />} />
				<Route path="/" exact={true}>
					<Redirect to="/tabs/treino" />
				</Route>
			</IonRouterOutlet>
		</IonReactRouter>
	</IonApp>
);

export default App;