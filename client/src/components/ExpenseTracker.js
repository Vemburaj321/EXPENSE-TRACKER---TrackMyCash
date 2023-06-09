import React from 'react'
import Graph from './Graph';
import Form from './Form';

const ExpenseTracker = () => {
  return (
    <div className="mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
      <h1 className="text-4xl py-8 mb-10 bg-slate-800 text-white rounded">Expense Tracker</h1>

        {/* grid columns */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Chart */}
          <Graph></Graph>
          {/* Form */}
          <Form></Form>

        </div>
    </div>
  )
}

export default ExpenseTracker