import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <div className="h-10">
      <ToastContainer position="top-center" closeOnClick />
    </div>
      <Component {...pageProps} />
    </>
  );
}
