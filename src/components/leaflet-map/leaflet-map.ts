import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { Map, TileLayer, type LatLngTuple } from "leaflet";

import styles from "./leaflet-map.css?inline";

// TODO: prefer importing styles locally vs <link>?
// import leafletStyles from "leaflet/dist/leaflet.css?inline";

@customElement("leaflet-map")
export class LeafletMap extends LitElement {
  static styles = [
    // unsafeCSS(leafletStyles),
    unsafeCSS(styles),
  ];

  #map: Map | null = null;

  @query("#map")
  container!: HTMLElement;

  @property({ attribute: false }) tileLayer!: TileLayer;

  @property({ type: Array }) center: LatLngTuple = [37.8, -122.27];

  @property({ type: Number, reflect: true }) zoom = 12;

  firstUpdated(): void {
    if (!this.#map) {
      this.#map = new Map(this.container).setView(this.center, this.zoom);
    }
    if (!this.tileLayer) {
      this.tileLayer = new TileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        },
      ).addTo(this.#map);
    }
  }

  private _renderLeafletStylesLink() {
    return html`<link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@2.0.0-alpha.1/dist/leaflet.css"
    />`;
  }

  private _renderMapContainer() {
    return html`<div id="map" role="application"></div>`;
  }

  render() {
    return html`${this._renderLeafletStylesLink()} ${this._renderMapContainer()}`;
  }
}
