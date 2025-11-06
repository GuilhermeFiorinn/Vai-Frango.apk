import { IonToolbar } from '@ionic/react';

const AppBanner: React.FC = () => {
    const bannerHeight = 120;

    // Estilo para o container principal do banner
    const bannerContentStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', // Alinha o conteúdo à esquerda
        paddingLeft: '1.5rem', // Espaçamento à esquerda (24px)
        paddingRight: '1.5rem', // Espaçamento à direita (24px)
    };

    // --- CORREÇÃO AQUI (Texto Principal) ---
    const mainTextStyle: React.CSSProperties = {
        fontSize: '2.2rem', // Tamanho maior para o texto principal
        fontWeight: 'bold',
        color: '#E6E6E6', 
        lineHeight: '1.1', 
        margin: 0, 
    };

    // --- CORREÇÃO AQUI (Sub-texto) ---
    const subTextStyle: React.CSSProperties = {
        fontSize: '1rem', // Tamanho menor para o sub-texto
        color: '#9E9D9D', 
        margin: 0,
    };

    return (
        <IonToolbar style={{ 
            height: bannerHeight, 
            "--background": "#322B28" // Sua nova cor de fundo para o banner
        }}>
            <div style={bannerContentStyle}>
                <div> {/* Um div para agrupar os dois textos */}
                    <p style={mainTextStyle}>Vai Frango</p>
                    <p style={subTextStyle}>ta na hora de malhar</p>
                </div>
            </div>
        </IonToolbar>
    );
};

export default AppBanner;