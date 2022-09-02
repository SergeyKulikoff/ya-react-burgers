import { CONSTRUCTOR_MODAL } from "../constants/actionTypes";

export type _TInitialModalState = {
	constructorModal: boolean;
};

export interface _IShowAction { readonly type: typeof CONSTRUCTOR_MODAL }
