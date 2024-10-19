import { MidtransClient } from "midtrans-node-client";


//  kita gunakan snaptoken saja
export const snap = new MidtransClient.Snap({
    isProduction: process.env.MIDTRANS_DEVELOPMENT,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
})