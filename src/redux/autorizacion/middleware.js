/** @format */
import { AUTORIZACION, AUTORIZACION_SUCCESS, AUTORIZACION_ERROR, ACCEPT, ACCEPT_SUCCESS, ACCEPT_ERROR } from "./actions";

import { RESTAdd, RESTRequest } from "../rest/actions";
import { goTo } from "../routing/actions";
import { apiRequest, apiAction, apiFunction } from "../../redux/api/actions";
import { autorizacionFetch, grupoFamiliarFetch } from "../fetchs";
import { getGrupoFamiliar } from "../afiliados/actions";
import { autorizacion as autorizar } from "./actions";

export const processLogin =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        /*if (action.type === LOGIN_SUCCESS || action.type === LOGIN_SUCCESS_AUTO) {
           
        }*/
    };

export const processError =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        /*if (action.type === LOGIN_ERROR || action.type === RENOVACION_ERROR || action.type === RECUPERO_ERROR || action.type == LOGON_ERROR || action.type == UPDATE_PROFILE_ERROR) {
        }*/
    };

export const autorizacion =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === AUTORIZACION) {
            dispatch(RESTRequest(autorizacionFetch, "?token=" + action.token, AUTORIZACION_SUCCESS, AUTORIZACION_ERROR, ""));
        }
    };

export const autorizacionSuccess =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        next(action);
        if (action.type === AUTORIZACION_SUCCESS) {
            var titulares = getState().autorizacion.entities.titulares;
            if (titulares.length > 0) {
                dispatch(getGrupoFamiliar(titulares[0].titularId));
            }
            // dispatch(goTo("pruebaDaniel"));
        }
    };

export const middleware = [autorizacion, autorizacionSuccess, processLogin, processError];
