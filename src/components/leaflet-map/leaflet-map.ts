import {
  LitElement,
  html,
  unsafeCSS,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { customElement, property, query } from "lit/decorators.js";
import {
  type Layer,
  Map,
  TileLayer,
  type LatLngTuple,
  type LatLngBoundsExpression,
} from "leaflet";

import styles from "./leaflet-map.css?inline";
import { defaultStylesUrl } from "./constants";

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

  /** the L.Map instance, set internally */
  #map: Map | null = null;

  /** options passed to the L.Map instance when it is created */
  get #mapOptions(): ConstructorParameters<typeof Map>[1] {
    return {
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      scrollWheelZoom: !this.disableScrollWheelZoom,
    };
  }

  //#endregion

  //#region shadow dom queries

  @query("#map")
  container!: HTMLElement;

  //#endregion

  //#region public properties

  /** @readonly the component's L.Map instance */
  @property({ attribute: false })
  get map() {
    return this.#map;
  }

  /** the map's basemap TileLayer */
  @property({ attribute: false }) basemap!: TileLayer;

  /** the map's rectangular bounds */
  @property({
    attribute: false,
  })
  bounds!: LatLngBoundsExpression;

  /** @required map center coordinates as `lat,lng` */
  @property({
    type: Array,
    converter: {
      fromAttribute: (value: string) => {
        return value.split(",");
      },
      toAttribute: (value: LatLngTuple) => {
        return value.join(",");
      },
    },
  })
  center!: LatLngTuple;

  /** @required map zoom level */
  @property({ type: Number }) zoom!: number;

  /** Sets the lower limit for the available zoom levels */
  @property({ type: Number, attribute: "min-zoom" })
  minZoom!: number;

  /** Sets the upper limit for the available zoom levels */
  @property({ type: Number, attribute: "max-zoom" })
  maxZoom!: number;

  /** the URL to leaflet.css */
  @property({ type: String, attribute: "styles-url" })
  stylesUrl = defaultStylesUrl;

  /** disables zooming the map when the mouse wheel / track pad scroll event occurs */
  @property({
    type: Boolean,
    attribute: "disable-scroll-wheel-zoom",
  })
  disableScrollWheelZoom = false;

  // #endregion

  //#region lifecycle methods

  constructor() {
    super();
    if (!this.basemap) {
      this.basemap = new TileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        },
      );
    }
  }

  protected firstUpdated(): void {
    try {
      this._initMap();
    } catch (error) {
      console.error(String(error));
    }
  }

  protected updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("basemap")) {
      this._updateLayer(this.basemap, changedProperties.get("basemap"));
    }

    if (changedProperties.has("bounds")) {
      this.map?.fitBounds(this.bounds);
    }

    if (changedProperties.has("center")) {
      this.map?.setView(this.center);
    }

    if (changedProperties.has("disableScrollWheelZoom")) {
      if (this.disableScrollWheelZoom) {
        this.map?.scrollWheelZoom?.disable();
      } else {
        this.map?.scrollWheelZoom?.enable();
      }
    }

    if (changedProperties.has("minZoom")) {
      this.map?.setMinZoom(this.minZoom);
    }

    if (changedProperties.has("maxZoom")) {
      this.map?.setMaxZoom(this.maxZoom);
    }

    if (changedProperties.has("zoom")) {
      this.map?.setZoom(this.zoom);
    }
  }

  //#endregion

  //#region private methods

  /** creates the L.Map instance, setting its center, zoom, and basemap layer */
  private _initMap(): void {
    if (!this.#map) {
      this.#map = new Map(this.container, this.#mapOptions).setView(
        this.center,
        this.zoom,
      );
    }
    if (this.basemap) {
      this.basemap.addTo(this.#map);
    }
  }

  /** updates a map layer, optionally removing the old / previous layer */
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
    return html`<link rel="stylesheet" href="${this.stylesUrl}" />`;
  }

  private _renderMapContainer(): TemplateResult {
    return html`<div id="map" role="application"></div>`;
  }

  render(): TemplateResult {
    return html`${this._renderLeafletStylesLink()} ${this._renderMapContainer()}`;
  }

  //#endregion
}
