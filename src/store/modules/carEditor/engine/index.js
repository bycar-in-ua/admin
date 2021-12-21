import apiClient from "@/helpers/apiClient";
import { UPDATE_CAR_FIELD } from "../mutationTypes";
import {
  CREATE_NEW_ENGINE,
  OPEN_CREATE_ENGINE_MODAL,
  OPEN_EDIT_ENGINE_MODAL,
  EDIT_ENGINE,
  DELETE_ENGINE,
} from "./actionTypes";
import {
  UPDATE_ENGINE_MODAL_OPEN,
  UPDATE_ENGINE,
  UPDATE_ENGINE_FIELD,
} from "./mutationTypes";

const newEngineBoilerplate = {
  displacement: null,
  tradename: null,
  injection: null,
  fuelType: null,
  manufactureIndex: null,
  pistons: null,
  numberOfValves: null,
  pistonsPlacement: null,
  compressionRatio: null,
  cylinderShutOffSystem: false,
  cylinderShutOffNumberFrom: null,
  cylinderShutOffNumberTo: null,
  turbo: false,
  hybrid: false,
  softHybrid: false,
  power: null,
  powerRPMfrom: null,
  powerRPMto: null,
  torque: null,
  torqueRPMfrom: null,
  torqueRPMto: null,
  electric: null,
  electricEnginesQuantity: null,
  electricEnginesPLacement: null,
  electricPower: null,
  electricTorque: null,
  electricDistanceReserve: null,
  electricBatteryReserve: null,
  electricBatteryType: null,
  electricChargerType: null,
  electricSuperChargerChargeTime: null,
  electricRegularChargerChargeTime: null,
  electricBatteryCapacity: null,
  hybridTotalPower: null,
  hybridRechargeable: null,
  turbineQuantity: null,
  turboType: null,
};

export const engine = {
  state: () => ({
    engine: {},
    isEngineModalOpen: false,
  }),
  actions: {
    [OPEN_CREATE_ENGINE_MODAL]({ commit }) {
      commit(UPDATE_ENGINE_MODAL_OPEN, true);
      commit(UPDATE_ENGINE, { ...newEngineBoilerplate });
    },
    [OPEN_EDIT_ENGINE_MODAL]({ commit }, engine) {
      commit(UPDATE_ENGINE, engine);
      commit(UPDATE_ENGINE_MODAL_OPEN, true);
    },
    async [CREATE_NEW_ENGINE]({ state, rootState, commit }) {
      const newEngine = await apiClient.post("/engines", {
        ...state.engine,
        vehicle: rootState.carEditor.car.id,
      });
      commit(UPDATE_CAR_FIELD, [
        "engines",
        [...rootState.carEditor.car.engines, newEngine],
      ]);
      commit(UPDATE_ENGINE_MODAL_OPEN, false);
    },
    async [EDIT_ENGINE]({ state, commit }) {
      const updatedEngine = await apiClient.put(`/engines/${state.engine.id}`, {
        ...state.engine,
        displayName: undefined,
      });
      commit(UPDATE_ENGINE_FIELD, ["displayName", updatedEngine.displayName]);
      commit(UPDATE_ENGINE_MODAL_OPEN, false);
    },
    async [DELETE_ENGINE]({ rootState, commit }, engineId) {
      await apiClient.delete(`/engines/${engineId}`);
      commit(UPDATE_CAR_FIELD, [
        "engines",
        rootState.carEditor.car.engines.filter(
          (engine) => engine.id !== engineId
        ),
      ]);
    },
  },
  mutations: {
    [UPDATE_ENGINE_MODAL_OPEN](state, status) {
      state.isEngineModalOpen = status;
    },
    [UPDATE_ENGINE](state, engine) {
      state.engine = engine;
    },
    [UPDATE_ENGINE_FIELD](state, [field, val]) {
      state.engine[field] = val;
    },
  },
  getters: {
    isEngineEdit(state) {
      return !!state.engine.id;
    },
  },
};

export default engine;
