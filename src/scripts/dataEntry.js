var admin = require("firebase-admin");

var serviceAccount = require("../../firebase_credentials.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

const data = [
    {
        "name": "PTPTN Zaina",
        "type": "Education Loan",
        "term_month": 180,
        "interest_pct": 1,
        "installment": 319.44,
        "principal": 50000,
        "remaining": 46805.6
    },
    {
        "name": "Setia Residency",
        "type": "Housing Loan",
        "term_month": 420,
        "interest_pct": 4.5,
        "installment": 2342.63,
        "principal": 560000,
        "remaining": 503776.88
    },
    {
        "name": "Toyota Civic",
        "type": "Vehicle Loan",
        "term_month": 54,
        "interest_pct": 3.4,
        "installment": 1194.99,
        "principal": 109800,
        "remaining": 95460.12
    },
    {
        "name": "Maybank",
        "type": "Credit Card Bills",
        "term_month": 12,
        "interest_pct": 5,
        "installment": 262.5,
        "principal": 3000,
        "remaining": 1425
    },
    {
        "name": "Islamic Financing",
        "type": "Personal Loan",
        "term_month": 12,
        "interest_pct": 0,
        "installment": 150,
        "principal": 1800,
        "remaining": 900
    },
    {
        "name": "PTPTN Haziq",
        "type": "Education Loan",
        "term_month": 180,
        "interest_pct": 1,
        "installment": 638.89,
        "principal": 100000,
        "remaining": 89138.87
    },
    {
        "name": "Perodua Myvi",
        "type": "Vehicle Loan",
        "term_month": 54,
        "interest_pct": 3.5,
        "installment": 852.31,
        "principal": 70000,
        "remaining": 44430.7
    },
    {
        "name": "Bank Islam",
        "type": "Credit Card Bills",
        "term_month": 12,
        "interest_pct": 4.5,
        "installment": 348.33,
        "principal": 4000,
        "remaining": 1910.02
    }
]

const insertData = async () => {
    try {
        for (const item of data) {

            const docRef = await firestore.collection("debt").add(item);
            console.log("Document written with ID: ", docRef.id);
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

insertData();