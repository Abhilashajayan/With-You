"use client"
import React, { useState } from 'react';

function PaymentPage() {
  const redirectToStripe = (amount :any) => {
    // Redirect logic to Stripe checkout page with the selected amount
    window.location.href = `YOUR_STRIPE_CHECKOUT_URL?amount=${amount}`;
  };

  const [selectedPlan, setSelectedPlan] = useState(null);

  // Pricing options
  const pricingOptions = [
    { label: '1 Week', amount: 100, description: 'Unlock premium features for 1 week.', matchingCount: '10 matches per day' },
    { label: '2 Weeks', amount: 200, description: 'Enjoy premium access for 2 weeks at a discounted rate.', matchingCount: '20 matches per day' },
    { label: '1 Month', amount: 300, description: 'Get unlimited access for 1 month with exclusive benefits.', matchingCount: 'Unlimited matches per day' },
  ];

  // Calculate subtotal and GST
  const selectedOption = pricingOptions.find(option => option.label === selectedPlan);
  const subtotal = selectedOption ? selectedOption.amount : 0;
  const gst = subtotal * 0.18; // Assuming 18% GST

  return (
    <div className="min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <h2 className="text-center text-3xl font-extrabold text-gray-800">Choose Your Subscription</h2>
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pricingOptions.map((option : any) => (
              <div key={option.label} className={`relative flex flex-col items-center p-4 border rounded-md cursor-pointer ${selectedPlan === option.label ? 'bg-blue-50' : 'bg-white'}`} onClick={() => setSelectedPlan(option.label)}>
                <h3 className="text-lg font-semibold text-gray-800">{option.label}</h3>
                <p className="text-gray-600 font-bold">${option.amount}</p>
                <p className="text-sm text-gray-600">{option.description}</p>
                {selectedPlan === option.label && (
                  <React.Fragment>
                    <p className="text-sm text-gray-600 mt-2">Matching Count: {option.matchingCount}</p>
                    <button
                      type="button"
                      onClick={() => redirectToStripe(option.amount)}
                      className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Selected
                    </button>
                  </React.Fragment>
                )}
              </div>
            ))}
          </div>
        </div>
        {selectedPlan && (
          <div className="mt-8 flex flex-col md:flex-row md:justify-between items-center p-4 rounded-md">
          <div>
            <p className="text-sm font-semibold text-gray-700">Subtotal: ${subtotal}</p>
            <p className="text-sm font-semibold text-gray-700">GST (18%): ${gst.toFixed(2)}</p>
            <p className="text-lg font-bold text-gray-800">Total: ${(subtotal + gst).toFixed(2)}</p>
          </div>
          <button
            type="button"
            className="mt-4 md:mt-0 w-full md:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue
          </button>
        </div>
        )}
      </div>
    </div>
  );
}

export default PaymentPage;
