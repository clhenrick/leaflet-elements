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
  },
  render: (args) => {
    return html`<leaflet-map
      zoom=${args.zoom}
      .center=${args.center}
    ></leaflet-map>`;
  },
};
