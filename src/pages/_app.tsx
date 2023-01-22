import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import Primary from '@/components/layout/primary';
import NextNProgress from 'nextjs-progressbar';
import 'react-multi-carousel/lib/styles.css';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <Primary>
            <NextNProgress height={3} options={{ showSpinner: false }}/>
            <Component {...pageProps} />
        </Primary>
    );
}

export default MyApp;
