const now = new Date();
let currentMonth = now.getMonth();
let currentYear = now.getFullYear();

// Helper function to sort loans based on strategy
const sortLoans = (loans, strategy) => {
    const strategies = {
        avalanche: (a, b) => b.interest_pct - a.interest_pct,
        snowball: (a, b) => a.remaining - b.remaining,
        penalty: (a, b) => a.penalty_pct - b.penalty_pct
    };
    loans.sort(strategies[strategy]);
};

// Helper function to handle loan repayment and update remaining amount
const makeLoanPayment = (loan) => {
    loan.remaining -= (loan.payment_per_month > loan.remaining) 
        ? loan.remaining 
        : (loan.payment_per_month - (loan.remaining * (loan.interest_pct / 1200)));

    if (loan.remaining === 0) {
        return { name: loan.name, month: `${currentMonth + 1}/${currentYear}` };
    }
    return null;
};

// Simulate debt repayment
const simulateDeptRepayment = (loans, avg_cash_balance_per_month, strategy) => {
    sortLoans(loans, strategy);
    let result = [];
    while (loans.some(loan => loan.remaining > 0)) {
        let total_cash_balance = avg_cash_balance_per_month;
        for (let loan of loans) {
            if (loan.remaining > 0 && total_cash_balance > 0) {
                let payment = Math.min(loan.payment_per_month, loan.remaining);
                total_cash_balance -= payment;
                let paidResult = makeLoanPayment(loan);
                if (paidResult) result.push(paidResult);
            }
        }
        currentMonth = (currentMonth + 1) % 12;
        if (currentMonth === 0) {
            currentYear += 1;
        }
    }
    return result;
};

// Update debt repayment
const updateDebtRepayment = (loans, total_cash_balance, strategy) => {
    sortLoans(loans, strategy);
    for (let loan of loans) {
        if (loan.remaining > 0 && total_cash_balance > 0) {
            let payment = Math.min(loan.payment_per_month, loan.remaining, total_cash_balance);
            makePayment(loan.name, payment);
            total_cash_balance -= payment;
        }
    }
    return loans;
};

const makePayment = (name, amt) => {
    console.log(`RM${amt} has been paid for ${name}`);
};


// Simulate input
const loans = [
    {
        "name": "Home Loan 2024",
        "type": "Mortgage",
        "interest_pct": 5.00,
        "penalty_pct": 1.00,
        "payment_per_month": 1200.00,
        "principal": 250000.00,
        "remaining": 180000.00,
        "term_month": 240
    },
    {
        "name": "Car Loan A",
        "type": "Auto Loan",
        "interest_pct": 6.50,
        "penalty_pct": 1.50,
        "payment_per_month": 400.00,
        "principal": 15000.00,
        "remaining": 8000.00,
        "term_month": 60
    },
    {
        "name": "Education Loan B",
        "type": "Personal",
        "interest_pct": 4.20,
        "penalty_pct": 0.75,
        "payment_per_month": 350.00,
        "principal": 20000.00,
        "remaining": 12500.00,
        "term_month": 120
    }
];

// Simulate total_cash_balance
const total_cash_balance = 3000;

// Calculate expectation
const expectedTimeline = simulateDeptRepayment(loans, total_cash_balance, "avalanche");
console.log('Expected Timeline', expectedTimeline)

// Simulate calculation
const updatedLoans = updateDebtRepayment(loans, total_cash_balance, "avalanche");
console.log('Updated Loan', updatedLoans);