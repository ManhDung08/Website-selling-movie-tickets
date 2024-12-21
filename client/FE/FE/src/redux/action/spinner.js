import { TURN_OFF, TURN_ON } from "../constant/spinner";

export const turnOnLoadingAction = () => ({
  type: TURN_ON,
});

export const turnOffLoadingAction = () => ({
  type: TURN_OFF,
});
