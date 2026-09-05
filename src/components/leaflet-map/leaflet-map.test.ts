import { render } from "vitest-browser-lit";
import { describe, expect, test } from "vitest";
import { html } from "lit";
import "./leaflet-map";
import { defaultStylesUrl } from "./constants";

describe("leaflet-map", () => {
  test("renders without errors", async () => {
    const center = [37.8, -122.27] as const;
    const { getByRole } = render(
      html`<leaflet-map
        .center=${center}
        zoom=${12}
        styles-url=${defaultStylesUrl}
        style="--height:500px"
      ></leaflet-map>`,
    );

    await expect.element(getByRole("application")).toBeInTheDocument();
    await expect
      .element(getByRole("application"))
      .toHaveClass("leaflet-container");
  });

  test("renders with bounds", async () => {
    const center = [37.8, -122.27] as const;
    const bounds = [
      [37.702837, -122.508202],
      [37.908179, -122.035103],
    ] as const;
    const { getByRole } = render(
      html`<leaflet-map
        .center=${center}
        .bounds=${bounds}
        zoom=${12}
        styles-url=${defaultStylesUrl}
        style="--height:500px"
      ></leaflet-map>`,
    );
    await expect.element(getByRole("application")).toBeInTheDocument();
    await expect
      .element(getByRole("application"))
      .toHaveClass("leaflet-container");
  });

  test("renders with min and max zoom", async () => {
    const center = [37.8, -122.27] as const;
    const { getByRole } = render(
      html`<leaflet-map
        .center=${center}
        min-zoom=${12}
        max-zoom=${12}
        zoom=${12}
        styles-url=${defaultStylesUrl}
        style="--height:500px"
      ></leaflet-map>`,
    );
    await expect.element(getByRole("application")).toBeInTheDocument();
    await expect
      .element(getByRole("application"))
      .toHaveClass("leaflet-container");
  });

  test("honors disable-scroll-wheel-zoom", async () => {
    const center = [37.8, -122.27] as const;
    const { getByRole } = render(
      html`<leaflet-map
        disable-scroll-wheel-zoom
        .center=${center}
        zoom=${12}
        styles-url=${defaultStylesUrl}
        style="--height:500px"
      ></leaflet-map>`,
    );
    await expect.element(getByRole("application")).toBeInTheDocument();
    await expect
      .element(getByRole("application"))
      .toHaveClass("leaflet-container");
  });
});
