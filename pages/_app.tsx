import "@/styles/globals.css";
import { api } from "@/utils/api";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default api.withTRPC(App);
