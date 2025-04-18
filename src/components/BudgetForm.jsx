import React from "react";

const BudgetForm = ({ newBudget, setNewBudget, handleCreate }) => {
  return (
    <form onSubmit={handleCreate}>
      <h2 className="green-t">Create item</h2>

      <div>
        <label htmlFor="new-budget-name">Name</label>
        <input
          id="new-budget-name"
          type="text"
          placeholder="Name"
          value={newBudget.name}
          onChange={(e) => setNewBudget({ ...newBudget, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="new-budget-value">Value</label>
        <input
          id="new-budget-value"
          type="text"
          placeholder="Value"
          value={newBudget.value}
          onChange={(e) =>
            setNewBudget({ ...newBudget, value: Number(e.target.value) })
          }
          required
        />
      </div>

      <div>
        <label htmlFor="new-budget-month">Month</label>
        <input
          id="new-budget-month"
          type="text"
          placeholder="Month"
          value={newBudget.month}
          onChange={(e) =>
            setNewBudget({ ...newBudget, month: e.target.value })
          }
          required
        />
      </div>

      <div>
        <label htmlFor="new-budget-year">Year</label>
        <input
          id="new-budget-year"
          type="number"
          value={newBudget.year}
          onChange={(e) =>
            setNewBudget({ ...newBudget, year: Number(e.target.value) })
          }
          required
        />
      </div>

      <button type="submit">Add</button>
    </form>
  );
};

export default BudgetForm;
