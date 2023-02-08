/** @format */

import { html, LitElement, css } from "lit";
import { store } from "../../redux/store";
import { goTo } from "../../redux/routing/actions";
import { connect } from "@brunomon/helpers";
import { isInLayout } from "../../redux/screens/screenLayouts";

import { gridLayout } from "@brunomon/template-lit/src/views/css/gridLayout";
import { input } from "@brunomon/template-lit/src/views/css/input";
import { select } from "@brunomon/template-lit/src/views/css/select";
import { check } from "@brunomon/template-lit/src/views/css/check";
import { button } from "@brunomon/template-lit/src/views/css/button";
import { SEARCH, PERSON, COPY } from "../../../assets/icons/svgs";
import { busquedaComponent } from "../componentes/busqueda";
import { ordenar } from "../../redux/ui/actions";
import { verAfiliado } from "../../redux/uiAfiliados/actions";

const MEDIA_CHANGE = "ui.media.timeStamp";
const SCREEN = "screen.timeStamp";
const BUSQUEDA = "ui.busqueda.texto";
const ORDENAR = "ui.ordenar.timeStamp";

export class auditoriaAfiliaciones extends connect(store, MEDIA_CHANGE, SCREEN, BUSQUEDA, ORDENAR)(LitElement) {
    constructor() {
        super();
        this.area = "body";

        this.items = [
            {
                apellido: "monfri",
                cuil: "20200273770",
                discapacitado: false,
                documento: 20027377,
                estadoCivilId: "76151413-1847-4688-88f1-007356683e40",
                estadoCivilNombre: "Casado",
                estadosAfiliacionId: "4863e7e8-b653-4433-a6c5-85585e114781",
                estadosAfiliacionNombre: "En proceso de carga",
                fecha: "2022-12-27T15:28:37.0036774",
                fechaNacimiento: "2022-10-30T00:00:00",
                icono: "",
                id: "d54dd08b-f998-4eb4-942e-4aaf50ad571d",
                imagen: "https://app.uocra.org/credencialSindical/20027377.jpg",
                nacionalidadId: "62dc612e-2411-43b4-bc03-5d52938e285c",
                nacionalidadNombre: "Argentino",
                nombre: "bruno",
                parentescoId: "e4389c83-310c-4399-b5fa-9ab06a00eb23",
                parentescoNombre: "Titular",
                planId: "108f11fb-9952-4fe0-a26f-f8ee4e2e9b8e",
                planNombre: "OSPeCon",
                sexo: "Masculino",
                tipoDocumentoId: "eff03639-4ff1-4726-a742-c899d39a7ee5",
                tipoDocumentoNombre: "DNI",
                titularId: "d54dd08b-f998-4eb4-942e-4aaf50ad571d",
            },
            {
                apellido: "monfri",
                cuil: "20200273770",
                discapacitado: false,
                documento: 17558967,
                estadoCivilId: "58ad0561-d9f3-4373-9099-b7233c18a901",
                estadoCivilNombre: "Soltero",
                estadosAfiliacionId: "4863e7e8-b653-4433-a6c5-85585e114781",
                estadosAfiliacionNombre: "En proceso de carga",
                fecha: "2022-12-29T12:05:54.2669479",
                fechaNacimiento: "2022-10-30T00:00:00",
                icono: "",
                id: "95a6e200-a8a7-4c12-a3bd-6d1e5b493dc7",
                imagen: "https://app.uocra.org/credencialSindical/17558967.jpg",
                nacionalidadId: "62dc612e-2411-43b4-bc03-5d52938e285c",
                nacionalidadNombre: "Argentino",
                nombre: "gina",
                parentescoId: "290697a3-4867-4af1-4ca1-08dabdcdd477",
                parentescoNombre: "Familiar a cargo",
                planId: "108f11fb-9952-4fe0-a26f-f8ee4e2e9b8e",
                planNombre: "OSPeCon",
                sexo: "Femenino",
                tipoDocumentoId: "eff03639-4ff1-4726-a742-c899d39a7ee5",
                tipoDocumentoNombre: "DNI",
                titularId: "d54dd08b-f998-4eb4-942e-4aaf50ad571d",
            },
            {
                apellido: "monfri",
                cuil: "27359477606",
                discapacitado: false,
                documento: 35947760,
                estadoCivilId: "76151413-1847-4688-88f1-007356683e40",
                estadoCivilNombre: "Casado",
                estadosAfiliacionId: "4863e7e8-b653-4433-a6c5-85585e114781",
                estadosAfiliacionNombre: "En proceso de carga",
                fecha: "2022-12-27T15:28:13.2158892",
                fechaNacimiento: "2022-10-30T00:00:00",
                icono: "",
                id: "ec6ad2af-069a-4af6-ab96-769dd22e5491",
                imagen: "https://app.uocra.org/credencialSindical/35947760.jpg",
                nacionalidadId: "62dc612e-2411-43b4-bc03-5d52938e285c",
                nacionalidadNombre: "Argentino",
                nombre: "vero",
                parentescoId: "76425ed7-cdbd-4263-afb2-2ce475cce87d",
                parentescoNombre: "Cónyuge",
                planId: "108f11fb-9952-4fe0-a26f-f8ee4e2e9b8e",
                planNombre: "OSPeCon",
                sexo: "Femenino",
                tipoDocumentoId: "eff03639-4ff1-4726-a742-c899d39a7ee5",
                tipoDocumentoNombre: "DNI",
                titularId: "d54dd08b-f998-4eb4-942e-4aaf50ad571d",
            },
        ];
        this.orderActual = "fecha";
        this.cantidad = 0;
    }

    static get styles() {
        return css`
            ${gridLayout}
            ${input}
            ${select}
            ${button}
            :host {
                position: relative;
                display: grid;
                padding: 1rem;
                background-color: var(--aplicacion);
            }
            :host([hidden]) {
                display: none;
            }
            .cabecera {
                grid-template-columns: 86% 7% 6%;
                gap: 0 !important;
                align-content: start;
            }
            .contenedor {
                background-color: var(--formulario);
                box-shadow: var(--shadow-elevation-2-box);
                align-content: start;
            }
            .columnas {
                grid-template-columns: 0.3fr 1fr 2fr 1.5fr 1fr 2fr 1fr 2fr 1fr;
                color: var(--on-formulario);
                fill: var(--on-formulario);
                stroke: var(--on-formulario);
                font-size: 0.9rem;
                font-weight: bold;
                border-bottom: 2px solid var(--primario);
            }
            label {
                font-family: "Nunito", sans-serif;
                color: var(--on-formulario);
                font-size: 0.8rem;
                place-self: end;
            }
            svg {
                height: 1.3rem;
                width: 1.3rem;
                align-content: center;
                fill: var(--on-formulario);
                stroke: var(--on-formulario);
            }
            .registrosList {
                grid-template-columns: 0.3fr 1fr 2fr 1.5fr 1fr 2fr 1fr 2fr 1fr;
                color: var(--on-formulario);
                fill: var(--on-formulario);
                stroke: var(--on-formulario);

                font-size: 0.8rem;
                cursor: pointer;
                border-bottom: 1px solid var(--on-formulario-separador);
            }
            .lista {
                align-content: start;
                overflow-y: auto;
                height: 63vh;
            }
            .lista::-webkit-scrollbar {
                width: 7px;
            }
            .lista::-webkit-scrollbar-thumb {
                background-color: var(--primario);
                border-radius: 20px;
            }
            .ordena {
                cursor: pointer;
            }
            .busqueda {
                text-align: center;
            }
            .copy {
                text-align: end;
            }
            .cantidad {
                align-self: center;
            }
        `;
    }

    render() {
        return html` <div class="contenedor grid row">
            <div class="cabecera grid column">
                <busqueda-component class="busqueda"></busqueda-component>
                <div class="copy">${COPY}</div>
                <label class="cantidad">Cantidad: ${this.cantidad}</label>
            </div>

            <div class="grid row">
                <div class="columnas inner-grid column">
                    <div class="ordena" ?selected=${this.orderActual == "nombre"} @click=${this.ordenar} .order=${"nombre"}>Nombre</div>
                    <div class="ordena" ?selected=${this.orderActual == "apellido"} @click=${this.ordenar} .order=${"apellido"}>Apellido</div>
                    <div class="ordena" ?selected=${this.orderActual == "DNI"} @click=${this.ordenar} .order=${"DNI"}>DNI</div>
                </div>

                <div class="lista inner-grid ">
                    ${this.itemsfiltrados?.map((item) => {
                        return html`<div class="registrosList grid column " @click=${this.click} .item=${item} .option=${"proxPantalla"}>
                            <div>${item.apellido}</div>
                            <div>${item.nombre}</div>
                            <div>${item.documento}</div>
                        </div> `;
                    })}
                </div>
            </div>
        </div>`;
    }

    stateChanged(state, name) {
        if (name == MEDIA_CHANGE) {
            this.mediaSize = state.ui.media.size;
        }
        if (name == SCREEN) {
            this.hidden = true;
            const isCurrentScreen = ["auditoriaAfiliaciones"].includes(state.screen.name);
            if (isInLayout(state, this.area) && isCurrentScreen) {
                this.hidden = false;
            }
        }

        if (name == ORDENAR) {
            let orden = state.ui.ordenar.order;
            this.orderActual = orden;
            this.items = this.items.sort((a, b) => {
                if (a[orden] > b[orden]) return 1;
                if (a[orden] < b[orden]) return -1;
                return 0;
            });
            this.update();
        }

        if (name == BUSQUEDA) {
            if (state.screen.name == "auditoriaAfiliaciones") {
                if (state.ui.busqueda.texto != "") {
                    this.itemsfiltrados = this.items.filter((item) => {
                        const text = item.nombre + item.apellido + item.documento;
                        return text.includes(state.ui.busqueda.texto);
                    });
                } else {
                    this.itemsfiltrados = this.items;
                    state.ui.busqueda.texto = "";
                }
            }
            this.update();
        }

        this.itemsfiltrados = this.items;
    }

    click(e) {
        this.hidden = false;
        store.dispatch(verAfiliado(e.currentTarget.item));
    }

    ordenar(e) {
        store.dispatch(ordenar(e.currentTarget.order));
    }

    static get properties() {
        return {
            mediaSize: {
                type: String,
                reflect: true,
                attribute: "media-size",
            },
            orientation: {
                type: String,
                reflect: true,
            },
            hidden: {
                type: Boolean,
                reflect: true,
            },
            items: {
                type: Array,
                state: true,
            },
        };
    }
}
window.customElements.define("auditoria-afiliaciones", auditoriaAfiliaciones);
