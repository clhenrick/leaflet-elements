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
    center: [37.8, -122.27],
    zoom: 12,
    stylesUrl: "https://unpkg.com/leaflet@2.0.0-alpha.1/dist/leaflet.css",
    disableScrollWheelZoom: false,
  },
  render: ({ center, zoom, stylesUrl, disableScrollWheelZoom }) => {
    return html`<leaflet-map
      zoom=${zoom}
      .center=${center}
      stylesUrl=${stylesUrl}
      ?disablescrollwheelzoom=${disableScrollWheelZoom}
    ></leaflet-map>`;
  },
};

export const DisableScrollWheelZoom = {
  args: {
    ...Default.args,
    disableScrollWheelZoom: true,
  },
  render: Default.render,
};
