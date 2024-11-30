var admin = require("firebase-admin");

var serviceAccount = require("../../firebase_credentials.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

const data = [
    {
        "name": "BOC Home Loan",
        "monthly": "RM 2,352.62",
        "rate": "3.88%",
        "maxTenure": "35 Years",
        "type": "Housing Loan",
        "url": ""
    },
    {
        "name": "CIMB Flexi Home Financing-i",
        "monthly": "RM 2,489.06",
        "rate": "4.35%",
        "maxTenure": "35 Years",
        "type": "Housing Loan",
        "url": ""
    },
    {
        "name": "RHB My1 Full Flexi Home Loan",
        "monthly": "RM 2,593.19",
        "rate": "4.7%",
        "maxTenure": "35 Years",
        "type": "Housing Loan",
        "url": ""
    },
    {
        "name": "Alliance Conventional Home Financing",
        "monthly": "RM 2,838.95",
        "rate": "5.5%",
        "maxTenure": "35 Years",
        "type": "Housing Loan",
        "url": ""
    },
    {
        "name": "MortgageOne™",
        "monthly": "RM 2,358.34",
        "rate": "3.9%",
        "maxTenure": "35 Years",
        "type": "Housing Loan",
        "url": ""
    },
    {
        "name": "Saadiq My HomeOne-i",
        "monthly": "RM 2,358.34",
        "rate": "3.9%",
        "maxTenure": "35 Years",
        "type": "Housing Loan",
        "url": ""
    },
    {
        "name": "Al-Amali Home Financing-i",
        "monthly": "RM 2,445.09",
        "rate": "4.2%",
        "maxTenure": "35 Years",
        "type": "Housing Loan",
        "url": ""
    },
    {
        "name": "Alliance One Account",
        "monthly": "RM 2,838.95",
        "rate": "5.5%",
        "maxTenure": "35 Years",
        "type": "Housing Loan",
        "url": ""
    },
    {
        "name": "SMART Mortgage Home Financing",
        "monthly": "RM 2,518.59",
        "rate": "4.45%",
        "maxTenure": "35 Years",
        "type": "Housing Loan",
        "url": ""
    },
    {
        "name": "Maybank MaxiPlan",
        "monthly": "RM 1,701.71",
        "rate": "1.4%",
        "maxTenure": "30 Years",
        "type": "Housing Loan",
        "url": ""
    }
]

const insertData = async () => {
    try {
        for (const item of data) {

            const docRef = await firestore.collection("refinance").add(item);
            console.log("Document written with ID: ", docRef.id);
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

insertData();