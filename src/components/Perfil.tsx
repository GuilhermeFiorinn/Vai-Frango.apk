"use client";

import {
	IonList,
	IonListHeader,
	IonItem,
	IonLabel,
	IonBadge,
	IonNote,
} from "@ionic/react";

import profileData from "../data/perfil.json";

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
	membroDesde?: string;
	alturaCm: number;
	pesoKg: number;
	medidas: Medidas;
};

const profile: ProfileData = profileData;

export default function Profile() {
	return (
		<div>
			<div style={{textAlign: 'center', paddingBottom: '2rem'}}>
				
				<h1 style={{
                    fontSize: '1.75rem', 
                    fontWeight: 'bold', 
                    color: '#E6E6E6'
                }}>
                    {profile.nome}
                </h1>
				
                <IonNote>{profile.email}</IonNote>
			</div>
			<div>
				<IonList inset={true}>
					<IonListHeader>
						<IonLabel>Informações Pessoais</IonLabel>
					</IonListHeader>
					
					<IonItem>
						<IonLabel>Altura:</IonLabel>
						<IonBadge slot="end">{profile.alturaCm} cm</IonBadge>
					</IonItem>
					<IonItem>
						<IonLabel>Peso:</IonLabel>
						<IonBadge slot="end">{profile.pesoKg} kg</IonBadge>
					</IonItem>
					{profile.membroDesde && (
						<IonItem lines="none">
							<IonLabel>Membro desde:</IonLabel>
							<IonNote slot="end">
								{new Date(profile.membroDesde).toLocaleDateString('pt-BR')}
							</IonNote>
						</IonItem>
					)}
				</IonList>

				{/* Lista de Medidas Específicas */}
				<IonList inset={true}>
					<IonListHeader>
						<IonLabel>Medidas Específicas (cm)</IonLabel>
					</IonListHeader>
                    {/* ... (Restante dos IonItems) ... */}
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