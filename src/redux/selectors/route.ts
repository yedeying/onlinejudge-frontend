import { ApplicationState } from '../modules/root';
export const selectPath = (state: ApplicationState) => state.router.location;
