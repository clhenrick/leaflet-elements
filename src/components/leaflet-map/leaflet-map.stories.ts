import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "./leaflet-map";

const meta: Meta = {
  component: "leaflet-map",
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    bounds: [],
    center: [37.8, -122.27],
    zoom: 12,
    stylesUrl: "https://unpkg.com/leaflet@2.0.0-alpha.1/dist/leaflet.css",
    disableScrollWheelZoom: false,
  },
  render: ({ bounds, center, zoom, stylesUrl, disableScrollWheelZoom }) => {
    return html`<leaflet-map
      zoom=${zoom}
      .bounds=${bounds}
      .center=${center}
      stylesUrl=${stylesUrl}
      ?disablescrollwheelzoom=${disableScrollWheelZoom}
    ></leaflet-map>`;
  },
};

export const Bounds = {
  args: {
    ...Default.args,
    bounds: [
      [37.702837, -122.508202],
      [37.908179, -122.035103],
    ],
  },
  render: Default.render,
};

export const DisableScrollWheelZoom = {
  args: {
    ...Default.args,
    disableScrollWheelZoom: true,
  },
  render: Default.render,
};
