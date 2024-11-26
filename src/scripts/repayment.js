const now = new Date();
let currentMonth = now.getMonth();
let currentYear = now.getFullYear();

// Helper function to sort loans based on strategy
const sortLoans = (loans, strategy) => {
    const strategies = {
        avalanche: (a, b) => b.interest_pct - a.interest_pct,
        snowball: (a, b) => a.remaining_amount - b.remaining_amount,
        penalty: (a, b) => a.penalty_pct - b.penalty_pct
    };
    loans.sort(strategies[strategy]);
};

// Helper function to handle loan repayment and update remaining amount
const makeLoanPayment = (loan) => {
    loan.remaining_amount -= (loan.payment_per_month > loan.remaining_amount) 
        ? loan.remaining_amount 
        : (loan.payment_per_month - (loan.remaining_amount * (loan.interest_pct / 1200)));

    if (loan.remaining_amount === 0) {
        return { loan_name: loan.loan_name, month: `${currentMonth + 1}/${currentYear}` };
    }
    return null;
};

// Simulate debt repayment
const simulateDeptRepayment = (loans, avg_cash_balance_per_month, strategy) => {
    sortLoans(loans, strategy);
    let result = [];
    while (loans.some(loan => loan.remaining_amount > 0)) {
        let total_cash_balance = avg_cash_balance_per_month;
        for (let loan of loans) {
            if (loan.remaining_amount > 0 && total_cash_balance > 0) {
                let payment = Math.min(loan.payment_per_month, loan.remaining_amount);
                total_cash_balance -= payment;
                let paidResult = makeLoanPayment(loan);
                if (paidResult) result.push(paidResult);
            }
        }
        currentMonth = (currentMonth + 1) % 12;
        if (currentMonth === 0) currentYear += 1;
    }
    return result;
};

// Update debt repayment
const updateDebtRepayment = (loans, total_cash_balance, strategy) => {
    sortLoans(loans, strategy);
    for (let loan of loans) {
        if (loan.remaining_amount > 0 && total_cash_balance > 0) {
            let payment = Math.min(loan.payment_per_month, loan.remaining_amount, total_cash_balance);
            makePayment(loan.loan_name, payment);
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
        "loan_name": "Home Loan 2024",
        "loan_type": "Mortgage",
        "interest_pct": 5.00,
        "penalty_pct": 1.00,
        "payment_per_month": 1200.00,
        "initial_amount": 250000.00,
        "remaining_amount": 180000.00,
        "loan_term": "20 years"
    },
    {
        "loan_name": "Car Loan A",
        "loan_type": "Auto Loan",
        "interest_pct": 6.50,
        "penalty_pct": 1.50,
        "payment_per_month": 400.00,
        "initial_amount": 15000.00,
        "remaining_amount": 8000.00,
        "loan_term": "5 years"
    },
    {
        "loan_name": "Education Loan B",
        "loan_type": "Personal",
        "interest_pct": 4.20,
        "penalty_pct": 0.75,
        "payment_per_month": 350.00,
        "initial_amount": 20000.00,
        "remaining_amount": 12500.00,
        "loan_term": "10 years"
    }
];

// Simulate total_cash_balance
const total_cash_balance = 4000;

// Calculate expectation
const expectedTimeline = simulateDeptRepayment(loans, total_cash_balance, "avalanche");
console.log('Expected Timeline', expectedTimeline)

// Simulate calculation
const updatedLoans = updateDebtRepayment(loans, total_cash_balance, "avalanche");
console.log('Updated Loan', updatedLoans);