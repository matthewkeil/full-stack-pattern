var y = (e, n) => () => (n || e((n = { exports: {} }).exports, n), n.exports);
var b = y((H, I) => {
  var d = require('aws-sdk');
  var S = require('https');
  function E(e, n) {
    e = new URL(e);
    return {
      protocol: e.protocol,
      host: e.host,
      port: e.port,
      pathName: e.pathName,
      method: n,
      headers: { 'Content-Type': 'application/json' }
    };
  }
  var A = function(e) {
    if (!e.method) {
      throw new Error('RPC method not specified.');
    }
    if (!e.endpoint) {
      throw new Error('HTTP Endpoint not specified.');
    }
    const n = JSON.stringify({
      jsonrpc: '2.0',
      id: e.id || 1,
      raw: !!e.raw,
      method: e.method,
      params: e.params || []
    });
    const o = e.endpoint;
    const r = E(o, 'POST');
    const s = process.env.AWS_DEFAULT_REGION || 'us-east-1';
    const a = new d.EnvironmentCredentials('AWS');
    const i = new d.Endpoint(r.host);
    const c = new d.HttpRequest(i, s);
    c.method = r.method;
    c.body = n;
    c.headers['host'] = r.host;
    const l = new d.Signers.V4(c, 'managedblockchain');
    l.addAuthorization(a, new Date());
    r.headers['Authorization'] = c.headers['Authorization'];
    r.headers['X-Amz-Date'] = c.headers['X-Amz-Date'];
    r.headers['X-Amz-Security-Token'] = process.env.AWS_SESSION_TOKEN;
    return new Promise((g, f) => {
      let u = S.request(o, r, p => {
        let m = '';
        p.on('data', h => {
          m += h;
        });
        p.on('end', () => {
          try {
            const h = JSON.parse(m);
            g(h.result || h.error);
          } catch (h) {
            f(`Invalid Response`, m);
            return;
          }
        });
      });
      u.on('error', p => {
        f(p);
      });
      u.write(n);
      u.end();
    });
  };
  var N = () => process.env.AMB_HTTPS_ENDPOINT || false;
  var t = {
    hexToInt: e => parseInt(e, 16),
    removeLeadingZeroes: e => e.replace('^0x(00)+', '0x'),
    intToHexNumber: e => {
      if (typeof e === 'number') {
        return '0x' + e.toString(16);
      }
      return e;
    },
    stringToHex: e => {
      const n = Buffer.from(e, 'utf8');
      return [...new Uint8Array(n)].map(o => o.toString(16).padStart(2, '0')).join('');
    }
  };
  var T = {
    Account: { nonce: t.hexToInt, balance: t.hexToInt },
    Block: {
      baseFeePerGas: t.hexToInt,
      difficulty: t.hexToInt,
      gasLimit: t.hexToInt,
      gasUsed: t.hexToInt,
      number: t.hexToInt,
      size: t.hexToInt,
      timestamp: t.hexToInt,
      totalDifficulty: t.hexToInt
    },
    Transaction: {
      blockNumber: t.hexToInt,
      gas: t.hexToInt,
      gasPrice: t.hexToInt,
      nonce: t.hexToInt,
      transactionIndex: t.hexToInt,
      value: t.hexToInt
    },
    TransactionReceipt: {
      blockNumber: t.hexToInt,
      gasUsed: t.hexToInt,
      transactionIndex: t.hexToInt,
      effectiveGasPrice: t.hexToInt,
      cumulativeGasUsed: t.hexToInt,
      status: t.hexToInt,
      type: t.hexToInt
    },
    Subscription: {},
    TxPoolStatus: { pending: t.hexToInt, queued: t.hexToInt },
    HexNumber: t.hexToInt
  };
  var w = {
    eth_blockNumber: 'HexNumber',
    eth_getTransactionCount: 'HexNumber',
    eth_getBlockByHash: 'Block',
    eth_getBlockByNumber: 'Block',
    eth_getProof: 'Account',
    eth_getTransactionByBlockHashAndIndex: 'Transaction',
    eth_getTransactionByBlockNumberAndIndex: 'Transaction',
    eth_getTransactionByHash: 'Transaction',
    eth_getTransactionReceipt: 'TransactionReceipt',
    eth_gasPrice: 'HexNumber',
    txpool_status: 'TxPoolStatus'
  };
  var _ = (e, n) => {
    const o = w[e];
    if (!o) {
      return n;
    }
    if (typeof T[o] === 'object') {
      const r = Object.entries(T[o]);
      r.forEach(s => {
        try {
          const [a, i] = s;
          n[a] = i(n[a]);
        } catch (a) {
          console.warn('Formatting issue, skipping attribute.', n, s);
        }
      });
    } else if (typeof T[o] === 'function') {
      n = T[o](n);
    }
    return n;
  };
  I.exports = { rpc: A, formatRpc: _, AmbHttpEndpointFromEnvironment: N, FORMATTERS: t };
});
var { rpc: P, AmbHttpEndpointFromEnvironment: R, formatRpc: k } = b();
var x;
exports.handler = async function(e) {
  const n = 'eth_getProof';
  let { params: o, id: r, raw: s, httpEndpoint: a } = e;
  if (!x) {
    x = a || R();
  }
  const i = await P({ method: n, params: o, id: r, endpoint: x });
  if (s) return i;
  return k(n, i);
};
