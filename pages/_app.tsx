import '../styles/globals.css';
import type {AppProps} from 'next/app';
import Primary from '../components/layout/primary';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <Primary>
            <Component {...pageProps} />
        </Primary>
    );
}

export default MyApp;
