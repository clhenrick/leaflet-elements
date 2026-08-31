import { render } from "vitest-browser-lit";
import { expect, test } from "vitest";
import { html } from "lit";
import "./leaflet-map";

test("renders without errors", async () => {
  const center = [37.8, -122.27] as const;
  const { getByRole } = render(
    html`<leaflet-map .center=${center} zoom=${12}></leaflet-map>`,
  );

  await expect.element(getByRole("application")).toBeInTheDocument();
});
