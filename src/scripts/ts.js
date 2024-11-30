const ARIMA = require('arima');
// function tuneSARIMA(data) {

//     let bestParams = {};
//     let bestErrorAvg = Infinity;
    
//     // Define ranges for each parameter
//     const pRange = [0, 1, 2]; 
//     const dRange = [0, 1];    
//     const qRange = [0, 1, 2]; 
//     const PRange = [0, 1];    
//     const DRange = [0, 1];    
//     const QRange = [0, 1];    
//     // const sRange = [12];      
    
//     // Iterate through all combinations of the parameters
//     for (let p of pRange) {
//         for (let d of dRange) {
//             for (let q of qRange) {
//                 for (let P of PRange) {
//                     for (let D of DRange) {
//                         for (let Q of QRange) {
//                             const model = new ARIMA({
//                                 p: p,
//                                 d: d,
//                                 q: q,
//                                 P: P,
//                                 D: D,
//                                 Q: Q,
//                                 s: 12,
//                                 verbose: false
//                             });

//                             // Train the model on the data
//                             const trainedModel = model.train(data);

//                             // Make predictions (for the last N points, e.g., 6)
//                             const [predictions, errors] = trainedModel.predict(6);

//                             if (predictions.length === 0 || errors.length === 0) {
//                                 console.error(`No predictions or errors for p=${p}, d=${d}, q=${q}, P=${P}, D=${D}, Q=${Q}`);
//                                 continue; // Skip this configuration if there's an issue with predictions or errors
//                             }
                            
//                             // Evaluate the model by calculating MSE
//                             const avgError = errors.reduce((sum, val) => sum + val, 0) / errors.length;

//                             // If this model has the lowest MSE, save the parameters
//                             if (avgError < bestErrorAvg) {
//                                 bestErrorAvg = avgError;
//                                 bestParams = { p, d, q, P, D, Q, s: 12 };
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }

//     return bestParams;
// }

// Example time series data
// const data = [123, 546, 293, 781, 902, 57, 467, 876, 234, 657, 342, 897, 563, 456, 123, 478, 901, 345, 876, 234];
const data = [3661.0299999999997, 5204.679999999999, 5004.21, 490.03000000000003, 1649.0500000000002, 3290.48]
const sarima = new ARIMA({ p: 2, d: 1, q: 2, P: 1, D: 0, Q: 1, s: 6, verbose: false }).train(data)

const [pred, errors] = sarima.predict(6)

console.log('pred', pred);
console.log('error', errors);

// Perform parameter tuning
// const bestParams = tuneSARIMA(data);

// // Output the best parameters
// console.log('Best SARIMA Parameters:', bestParams);