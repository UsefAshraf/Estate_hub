import { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';

interface MortgageCalculatorProps {
    propertyPrice?: number;
}

const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ propertyPrice = 1250000 }) => {
    const [price, setPrice] = useState<number>(propertyPrice);
    const [downPayment, setDownPayment] = useState<number>(propertyPrice * 0.24);
    const [loanTerm, setLoanTerm] = useState<number>(30);

    // Derived values
    const downPaymentPercentage = ((downPayment / price) * 100).toFixed(0);
    const loanAmount = price - downPayment;

    // Monthly payment WITHOUT interest
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment = loanAmount / numberOfPayments;

    // Totals
    const totalInterest = 0;
    const totalPayment = loanAmount;

    // Update down payment when price changes
    useEffect(() => {
        setDownPayment(price * 0.24);
    }, [price]);

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatCurrencyDecimal = (value: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="max-w-7xl mx-auto mb-4 px-4 pb-12 bg-primary rounded-xl shadow-sm border border-gray-200 p-6 bg-secondary">
            <div className="flex items-center space-x-2 mb-6">
                <Calculator className="w-5 h-5 text-gray-secondary" />
                <h2 className="text-xl font-bold text-secondary">Mortgage Calculator</h2>
            </div>

            <div className="space-y-6">
                {/* Property Price */}
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-l font-semibold text-secondary">Property Price</label>
                        <span className="text-l font-bold text-secondary">{formatCurrency(price)}</span>
                    </div>
                    <input
                        type="range"
                        min="100000"
                        max="5000000"
                        step="10000"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full h-2 bg-gray-300 rounded-lg  cursor-pointer accent-orange-900"
                    />
                </div>

                {/* Down Payment */}
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-l font-semibold text-secondary">Down Payment</label>
                        <span className="text-l font-bold text-secondary">
                            {formatCurrency(downPayment)} ({downPaymentPercentage}%)
                        </span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max={price}
                        step="1000"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="w-full h-2 bg-gray-300 rounded-lg  cursor-pointer accent-orange-900"
                    />
                </div>

                {/* Loan Term */}
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-l font-semibold text-secondary">Loan Term</label>
                        <span className="text-l font-bold text-secondary">{loanTerm} years</span>
                    </div>
                    <input
                        type="range"
                        min="5"
                        max="30"
                        step="1"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        className="w-full h-2 bg-gray-300 rounded-lg  cursor-pointer accent-orange-900"
                    />
                </div>

                {/* Results */}
                <div className="pt-6 border-t border-gray-300 space-y-3">
                    <div className="flex justify-between">
                        <span className="text-l font-bold text-secondary">Loan Amount</span>
                        <span className="text-l font-semibold text-secondary">{formatCurrency(loanAmount)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-l font-bold text-secondary">Monthly Payment</span>
                        <span className="text-lg font-bold text-orange-900">
                            {formatCurrencyDecimal(monthlyPayment)}/mo
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-l font-bold text-secondary">Total Interest</span>
                        <span className="text-l font-semibold text-secondary">{formatCurrency(totalInterest)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-l font-bold text-secondary">Total Payment</span>
                        <span className="text-l font-semibold text-secondary">{formatCurrency(totalPayment)}</span>
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default MortgageCalculator;
