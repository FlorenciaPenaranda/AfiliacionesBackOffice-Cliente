/** @format */

import { html, LitElement, css } from "lit";
import { connect } from "@brunomon/helpers";
import { store } from "../redux/store";
import { layoutsCSS } from "../views/ui/layouts";
import { getLayout } from "../redux/screens/screenLayouts";

import { goTo } from "../redux/routing/actions";

import { spinner } from "@brunomon/template-lit/src/views/css/spinner";
import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";

import { splashScreen } from "./componentes/splash";
import { menuPrincipal } from "./headers/menu";
import { auditoriaAfiliaciones } from "./sistema/auditoriaAfiliaciones";

import { afiliadoDatosScreen } from "./sistema/afiliadoDatos";
import { afiliadoDireccionScreen } from "./sistema/afiliadoDireccion";
import { afiliadoContactoScreen } from "./sistema/afiliadoContacto";
import { afiliadoDocumentacionScreen } from "./sistema/afiliadoDocumentacion";
import { afiliadoAltaFinScreen } from "./sistema/afiliadoAltaFin";

import { ConfirmControl } from "./componentes/confirm";
import { AlertControl } from "./componentes/alert";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const SELECTION = "ui.menu.timeStamp";

export class viewManager extends connect(store, MEDIA_CHANGE, SCREEN, SELECTION)(LitElement) {
    constructor() {
        super();
        window.onpopstate = (event) => {
            if (event.state) {
                store.dispatch(goTo(event.state.option, true));
            } else {
                window.history.back();
            }
        };
    }

    static get styles() {
        return css`
            ${layoutsCSS}
            ${gridLayout}
            ${spinner}

            :host {
                display: grid;
                padding: 0;
                background-color: var(--aplicacion);
                overflow: hidden;
                position: ;
            }
            :host::-webkit-scrollbar {
                width: 0.5vw;
                cursor: pointer;
            }
            :host::-webkit-scrollbar([media-size="small"]) {
                display: none;
            }
            :host::-webkit-scrollbar-thumb {
                background: var(--secundario);
                border-radius: 5px;
            }
        `;
    }

    render() {
        return html`
            <menu-principal></menu-principal>
            <splash-screen id="splash" area="body"></splash-screen>
            <auditoria-afiliaciones area="body"></auditoria-afiliaciones>

            <afiliado-datos-screen id="afiliadoDatos" area="body"></afiliado-datos-screen>
            <afiliado-direccion-screen id="afiliadoDireccion" area="body"></afiliado-direccion-screen>
            <afiliado-contacto-screen id="afiliadoContacto" area="body"></afiliado-contacto-screen>
            <afiliado-documentacion-screen id="afiliadoDocumentacion" area="body"></afiliado-documentacion-screen>
            <afiliado-alta-fin-screen id="afiliadoAltaFin" area="body"></afiliado-alta-fin-screen>

            <alert-control></alert-control>
            <confirm-control></confirm-control>
        `;
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE || name == SCREEN) {
            this.mediaSize = state.ui.media.size;
            this.orientation = state.ui.media.orientation;
            this.layout = getLayout(state).name;
            if (!window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
                if ("standalone" in window.navigator && window.navigator.standalone) {
                    this.style.height = document.documentElement.offsetHeight ? document.documentElement.offsetHeight : window.innerHeight + "px";
                } else {
                    if (state.ui.media.orientation == "portrait") {
                        this.style.height = window.innerHeight < window.innerWidth ? window.innerWidth : window.innerHeight + "px";
                    } else {
                        this.style.height = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight + "px";
                    }
                }
            }
        }
        this.update();
    }

    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: "media-size",
            },
            layout: {
                type: String,
                reflect: true,
            },
            orientation: {
                type: String,
                reflect: true,
            },
        };
    }
}

window.customElements.define("view-manager", viewManager);
