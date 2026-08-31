import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "./leaflet-map";

const meta: Meta = {
  component: "leaflet-map",
};

export default meta;
type Story = StoryObj;

export const LeafletMap: Story = {
  args: {
    center: [37.8, -122.27],
    zoom: 12,
    stylesUrl: "https://unpkg.com/leaflet@2.0.0-alpha.1/dist/leaflet.css",
  },
  render: ({ center, zoom, stylesUrl }) => {
    return html`<leaflet-map
      zoom=${zoom}
      .center=${center}
      stylesUrl=${stylesUrl}
    ></leaflet-map>`;
  },
};
