import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "./leaflet-map";
import { defaultStylesUrl } from "./constants";

const meta: Meta = {
  component: "leaflet-map",
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    center: [37.8, -122.27],
    zoom: 12,
    minZoom: 0,
    maxZoom: 19,
    stylesUrl: defaultStylesUrl,
    disableScrollWheelZoom: false,
  },
  render: ({
    bounds,
    center,
    zoom,
    minZoom,
    maxZoom,
    stylesUrl,
    disableScrollWheelZoom,
  }) => {
    return html`<leaflet-map
      zoom=${zoom}
      min-zoom=${minZoom}
      max-zoom=${maxZoom}
      .bounds=${bounds}
      .center=${center}
      styles-url=${stylesUrl}
      ?disable-scroll-wheel-zoom=${disableScrollWheelZoom}
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

export const MinMaxZoom = {
  args: {
    ...Default.args,
    minZoom: 12,
    maxZoom: 15,
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
