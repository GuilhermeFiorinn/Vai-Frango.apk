import { IonToolbar } from '@ionic/react';
import profileData from "../data/perfil.json";

const AppBanner: React.FC = () => {
    const bannerHeight = 120; // Sua altura do banner

    const mainContainerStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        maxWidth: '896px', // max-w-4xl
        margin: '0 auto',  // mx-auto
        paddingLeft: '1.5rem', // px-6
        paddingRight: '1.5rem', // px-6
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative', 
    };

    // --- CORREÇÕES AQUI ---

    // Estilo para o ícone do frango
    const chickenIconStyle: React.CSSProperties = {
        height: '80px', // Limita a altura do ícone do frango para caber no banner
        width: 'auto',
        objectFit: 'contain',
        marginRight: '10px', // Espaçamento entre o ícone e o título
    };

    // NOVO: Estilo para o texto do banner (nome do aplicativo)
    const bannerTitleStyle: React.CSSProperties = {
        fontSize: '2.5rem', // Tamanho do texto, ajuste conforme necessário
        fontWeight: 'bold',
        color: 'white', // Cor do texto
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)', // Uma leve sombra para destacar
    };

    // Estilo para a foto do perfil (permanece o mesmo, mas verifique o tamanho se necessário)
    const profilePicStyle: React.CSSProperties = {
        position: 'absolute',
        right: '1.5rem',
        top: '50%',
        transform: 'translateY(-50%)',
        height: '64px',
        width: '64px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid white',
        boxShadow: '0px 2px 5px rgba(0,0,0,0.2)', // Adiciona uma sombra para destacar
    };

    return (
        <IonToolbar style={{ height: bannerHeight, "--background": "#F89839" }}>
            <div style={mainContainerStyle}>
                
                {/* NOVO: Div para agrupar o ícone e o título */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src="/IconFrango.png"
                        alt="Ícone do Aplicativo"
                        style={chickenIconStyle}
                    />
                    <span style={bannerTitleStyle}>Frango Fit</span> {/* O texto do aplicativo */}
                </div>
                
                {/* A FOTO DE PERFIL */}
                <img
                    src={profileData.fotoUrl}
                    alt="Foto do Perfil"
                    style={profilePicStyle}
                />
                    
            </div>
        </IonToolbar>
    );
};

export default AppBanner;