import type {LayerProps} from 'react-map-gl/maplibre';

export const clusterLayer: LayerProps = {
  id: 'cluster',
  type: 'circle',
  source: 'data',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
    'circle-stroke-width': 3,
    'circle-stroke-color': '#9D9D9D'
  }
};

export const clusterCountLayer: LayerProps = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'data',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-size': 12
  }
};

export const unclusteredPointLayer: LayerProps = {
    id: 'unclustered-point',
    type: 'symbol',
    source: 'data',
    filter: ['!', ['has', 'point_count']],
    layout: {
        "icon-image": "custom-dot",
        "icon-size": 0.08
    }
};