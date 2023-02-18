import type { Writable } from 'svelte/store';
import d3 from '../../utils/d3-import';
import type { FooterStoreValue } from '../../stores';
import { getFooterStoreDefaultValue } from '../../stores';

const pointFormatter = d3.format(',');
const scaleFormatter = d3.format('.4f');

export class Footer {
  component: HTMLElement;
  scaleWidth: number;

  footerStoreValue: FooterStoreValue;
  footerStore: Writable<FooterStoreValue>;

  numPoints: string;
  scaleDataWidth: string;
  footerUpdated: () => void;

  constructor(
    component: HTMLElement,
    scaleWidth: number,
    footerStore: Writable<FooterStoreValue>,
    footerUpdated: () => void
  ) {
    this.component = component;
    this.scaleWidth = scaleWidth;
    this.footerStoreValue = getFooterStoreDefaultValue();
    this.footerStore = footerStore;
    this.footerUpdated = footerUpdated;

    this.numPoints = '0';
    this.scaleDataWidth = '0.0000';

    this.initStore();
  }

  initStore = () => {
    this.footerStore.subscribe(value => {
      this.footerStoreValue = value;

      // Format the number of points
      this.numPoints = pointFormatter(this.footerStoreValue.numPoints);

      // Get the scale encoding
      const stageWidth =
        this.scaleWidth / this.footerStoreValue.curZoomTransform.k;
      const dataWidth =
        this.footerStoreValue.xScale.invert(stageWidth) -
        this.footerStoreValue.xScale.invert(0);
      this.scaleDataWidth = scaleFormatter(dataWidth);

      this.footerUpdated();
    });
  };
}