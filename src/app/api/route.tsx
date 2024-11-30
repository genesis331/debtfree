import { NextResponse } from "next/server";
// const ARIMA = require('arima');

export const runtime = 'edge';
// To handle a GET request to /api
export async function GET() {
    // Synthesize timeseries
    // const ts = Array(24).fill(0).map((_, i) => i + Math.random() / 5)

    // Init arima and start training
    //     const arima = new ARIMA({
    //         p: 2,
    //         d: 1,
    //         q: 2,
    //         verbose: false
    //     }).train(ts)

    // Predict next 12 values
    // const [pred, errors] = arima.predict(12)
    // console.log(pred, errors);

    // Do whatever you want
    // return NextResponse.json({ pred: pred, errors: errors }, { status: 200 });
    return NextResponse.json({ message: "Hello, World!" }, { status: 200 });
}