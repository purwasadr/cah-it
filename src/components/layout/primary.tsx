import Head from 'next/head';
import { ReactNode } from 'react';
import Navbar from '@/components/navbar/navbar';

interface Props {
    children: ReactNode,
    noPadding?: boolean
}

const Primary = ({ noPadding = false, children }: Props) => {
    return (
        <>
            <Head>
                <title>Ngeblog</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
            <main className={`${!noPadding ? 'max-w-5xl py-6 px-5 sm:px-7 lg:px-4 mx-auto' : ''}`}>
                {children}
            </main>
        </>
    )
}

export default Primary;