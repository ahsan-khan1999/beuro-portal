import { ModalType } from "@/enums";

export interface GlobalState {
  loading: boolean;
  file: object | null;
  modal: {
    type: ModalType;
    cardId?: number;
  };
}

export type TranslatorFunction = (value: any) => any;
