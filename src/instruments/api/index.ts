import { RebillyStorefrontAPI } from "rebilly-js-sdk";
import { useConfiguration } from "../store/configuration";

let storefront;

export function useRebillyStorefrontAPI() {
  if (!storefront) {
    const { configuration } = useConfiguration();
    storefront = RebillyStorefrontAPI({
      organizationId: configuration.organizationId,
      sandbox: true,
      timeout: 6000,
    });
    storefront.setSessionToken(configuration.jwt);
  }
  return { api: storefront };
}
