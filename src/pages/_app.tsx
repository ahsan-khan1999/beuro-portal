import { store } from "@/api/store";
import "@/styles/globals.css";
import "node_modules/flag-icons/css/flag-icons.min.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { appWithTranslation } from "next-i18next";
import { Toaster } from "react-hot-toast";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Toaster position="top-right" toastOptions={{
        iconTheme: {
          primary: '#4A13E7',
          secondary: '#18d9c5',
        },
        duration: 3000
      }} />

      <Component {...pageProps} />
    </Provider>
  );
}

export default appWithTranslation(App);
