import {
  LitElement,
  html,
  unsafeCSS,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { Layer, Map, TileLayer, type LatLngTuple } from "leaflet";

import styles from "./leaflet-map.css?inline";

// TODO: prefer importing styles locally vs <link>?
// import leafletStyles from "leaflet/dist/leaflet.css?inline";

@customElement("leaflet-map")
export class LeafletMap extends LitElement {
  // #region static
  static styles = [
    // unsafeCSS(leafletStyles),
    unsafeCSS(styles),
  ];

  //#endregion

  //#region private properties

  #map: Map | null = null;

  //#endregion

  //#region shadow dom queries

  @query("#map")
  container!: HTMLElement;

  //#endregion

  //#region public properties

  /** provides public access to the component's L.Map instance */
  get map() {
    return this.#map;
  }

  /** @required the map's basemap (tile) layer */
  @property({ attribute: false }) basemap = new TileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
  );

  /** @required map center coordinates */
  @property({ type: Array }) center: LatLngTuple = [37.8, -122.27];

  /** @required map zoom level */
  @property({ type: Number, reflect: true }) zoom = 12;

  // #endregion

  //#region lifecycle methods

  firstUpdated(): void {
    if (!this.#map) {
      this.#map = new Map(this.container).setView(this.center, this.zoom);
    }
    if (this.basemap) {
      this.basemap.addTo(this.#map);
    }
  }

  protected updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("center")) {
      this.map?.setView(this.center);
    }

    if (changedProperties.has("zoom")) {
      this.map?.setZoom(this.zoom);
    }

    if (changedProperties.has("basemap")) {
      this._updateLayer(this.basemap, changedProperties.get("basemap"));
    }
  }

  //#endregion

  //#region private methods

  /** updates a map layer, removing the old layer if present */
  private _updateLayer(newLayer: Layer, oldLayer?: Layer): void {
    if (oldLayer) {
      this.map?.removeLayer(oldLayer);
    }
    if (newLayer) {
      this.map?.addLayer(newLayer);
    }
  }

  //#endregion

  //#region rendering

  private _renderLeafletStylesLink(): TemplateResult {
    return html`<link
      rel="stylesheet"
      // TODO: add property for specifying styles URL?
      href="https://unpkg.com/leaflet@2.0.0-alpha.1/dist/leaflet.css"
    />`;
  }

  private _renderMapContainer(): TemplateResult {
    return html`<div id="map"></div>`;
  }

  render(): TemplateResult {
    return html`${this._renderLeafletStylesLink()} ${this._renderMapContainer()}`;
  }

  //#endregion
}
