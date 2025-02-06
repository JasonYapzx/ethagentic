export const orgConfig = {
    orgCredentials: {
      secretKey: process.env.NILLION_SECRET_KEY,
      orgDid: process.env.NILLION_ORG_DID,
    },
    nodes: [
      {
        url: process.env.NILLION_NODE_1_URL,
        did: process.env.NILLION_NODE_1_DID,
      },
      {
        url: process.env.NILLION_NODE_2_URL,
        did: process.env.NILLION_NODE_2_DID,
      },
      {
        url: process.env.NILLION_NODE_3_URL,
        did: process.env.NILLION_NODE_3_DID,
      },
    ],
  };