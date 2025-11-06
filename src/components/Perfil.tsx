"use client";

// Precisa Importar componentes Ionic
import {
	IonList,
	IonListHeader,
	IonItem,
	IonLabel,
	IonBadge,
	IonAvatar,
} from "@ionic/react";

import profileData from "../data/perfil.json";
import { leafOutline } from "ionicons/icons";

type Medidas = {
	peitoCm: number;
	cinturaCm: number;
	antebracoDCm: number;
	antebracoECm: number;
};

type ProfileData = {
	nome: string;
	email: string;
	fotoUrl: string;
	alturaCm: number;
	pesoKg: number;
	medidas: Medidas;
};

// Carrega os dados do perfil do JSON
const profile: ProfileData = profileData;

export default function Profile() {
	return (
		/* --- CORREÇÃO ---
		 * Removemos "max-w-2xl mx-auto".
		 * A Página agora cuida do padding.
		*/
		<div className="w-full">
			<div className="flex flex-col items-center p-8">
				<IonAvatar className="w-32 h-32 border-4 border-orange-400 shadow-md">
					<img src={profile.fotoUrl} alt="Foto do Perfil" />
				</IonAvatar>
				<h1 style={{ marginLeft: '6px' }} className="text-3xl font-bold mt-4 text-gray-800 dark:text-gray-200 text-center">
					{profile.nome}
				</h1>
				<p style={{ marginLeft: '6px' }} className="text-md text-gray-500 dark:text-gray-400 text-center">
					{profile.email}
				</p>
			</div>

			<div className="space-y-6">	{/* Lista de Informações Pessoais */}
				<IonList inset={true}>
					<IonListHeader>
						<IonLabel className="text-xl font-semibold">
							Informações Pessoais
						</IonLabel>
					</IonListHeader>

					<IonItem>
						<IonLabel>Altura:</IonLabel>
						<IonBadge slot="end">{profile.alturaCm} cm</IonBadge>
					</IonItem>
					<IonItem>
						<IonLabel>Peso:</IonLabel>
						<IonBadge slot="end">{profile.pesoKg} kg</IonBadge>
					</IonItem>
				</IonList>

				{/* Lista de Medidas Específicas */}
				<IonList inset={true}>
					<IonListHeader>
						<IonLabel className="text-xl font-semibold">
							Medidas Específicas (cm)
						</IonLabel>
					</IonListHeader>

					<IonItem>
						<IonLabel>Peito:</IonLabel>
						<IonBadge slot="end">{profile.medidas.peitoCm} cm</IonBadge>
					</IonItem>
					<IonItem>
						<IonLabel>Cintura:</IonLabel>
						<IonBadge slot="end">{profile.medidas.cinturaCm} cm</IonBadge>
					</IonItem>
					<IonItem>
						<IonLabel>Antebraço Direito:</IonLabel>
						<IonBadge slot="end">{profile.medidas.antebracoDCm} cm</IonBadge>
					</IonItem>
					<IonItem lines="none">
						<IonLabel>Antebraço Esquerdo:</IonLabel>
						<IonBadge slot="end">{profile.medidas.antebracoECm} cm</IonBadge>
					</IonItem>
				</IonList>
			</div>
		</div>
	);
}