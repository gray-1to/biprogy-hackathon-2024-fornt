import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../../components/footer';
import Header from '../../components/header';

// TODO: 通知botページのリンクを作成する

export default function Notification(){
    return(
        <>
            <Head>
                <title>通知LINE botページ</title>
            </Head>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-3xl font-bold text-center mb-8">LINE通知bot</h1>
                    <Image className="overflow-x-auto" width={400} height={400} src='/bot-QR.png' alt='notification LINE bot QA' priority/>
                    <span>
                        上記のQAコードをLINEで読み込みましょう！
                        TaskTimeGuardianを友だち追加することで
                        想定時間を過ぎているタスクについて自動通知を受けることができます！
                    </span>
                    <Link
                        href="/task/list"
                        className="block w-full bg-white text-blue-500 border border-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-center"
                        >
                        タスク一覧へ
                    </Link>
                </div>
            </div>
            <Footer />
        </>
        
    )
}
