const MIDTRANS_SERVER_KEY = 'SB-Mid-server-Ll8XmkIEzDktf-s1g0OxlvAC';

const midtransClient = require('midtrans-client');
let snap = new midtransClient.Snap({
        isProduction : false,
        serverKey : MIDTRANS_SERVER_KEY
    });

module.exports = { snap };

