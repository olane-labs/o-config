import { tcp } from '@libp2p/tcp';
import { noise } from '@chainsafe/libp2p-noise';
import { yamux } from '@chainsafe/libp2p-yamux';
import { ping } from '@libp2p/ping';
import { identify } from '@libp2p/identify';
import { Libp2pInit } from 'libp2p';
import { gossipsub } from '@chainsafe/libp2p-gossipsub';
import { kadDHT, removePublicAddressesMapper } from '@libp2p/kad-dht';
import { mdns } from '@libp2p/mdns';

export interface Libp2pConfig extends Libp2pInit {
  listeners?: string[];
  transports?: any[];
  connectionEncrypters?: any[];
  streamMuxers?: any[];
  services?: Record<string, any>;
}

export const defaultLibp2pConfig: Libp2pConfig = {
  listeners: ['/ip4/0.0.0.0/tcp/0'],
  transports: [tcp()],
  connectionEncrypters: [noise()],
  streamMuxers: [yamux()],
  services: {
    ping: ping(),
    identify: identify(),
    pubsub: gossipsub({
      // Enable message signing for security
      globalSignaturePolicy: 'StrictSign',
    }),
    dht: kadDHT({
      protocol: '/ipfs/lan/kad/1.0.0',
      peerInfoMapper: removePublicAddressesMapper,
      clientMode: false,
    }),
  },
  peerDiscovery: [mdns()],
};
