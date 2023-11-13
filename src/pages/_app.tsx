import { store } from "@/api/store";
import "@/styles/globals.css";
import "node_modules/flag-icons/css/flag-icons.min.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { appWithTranslation } from "next-i18next";

 function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default appWithTranslation(App);
