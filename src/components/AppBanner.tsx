
import { IonToolbar } from '@ionic/react';

const AppBanner: React.FC = () => {
    const bannerHeight = 120;

    return (
        <IonToolbar
            className="w-full"
            style={{ height: bannerHeight, "--background": "#F89839" }}
        >
            <div className="max-w-4xl mx-auto px-6 h-full flex items-center justify-center">
                <img
                    src="/IconFrango.png"
                    className="max-h-full w-auto object-contain"
                />
            </div>
        </IonToolbar>
    );
};

export default AppBanner;