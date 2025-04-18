import React from "react";
import BudgetItem from "./BudgetItem";

const BudgetListByMonth = ({
  groupedItems,
  monthOrder,
  editingId,
  editBudget,
  setEditBudget,
  handleEditSubmit,
  handleDelete,
  startEdit,
  cancelEdit,
  formatCurrency,
}) => {
  return Object.entries(groupedItems)
    .sort(
      ([a], [b]) =>
        monthOrder.indexOf(a.toLowerCase()) -
        monthOrder.indexOf(b.toLowerCase())
    )
    .map(([month, data]) => (
      <li key={month}>
        <p>
          {month.charAt(0).toUpperCase() + month.slice(1)} (total:{" "}
          {formatCurrency(data.total)})
        </p>
        <ul>
          {data.items.map((item) => (
            <BudgetItem
              key={item.id}
              item={item}
              editingId={editingId}
              editBudget={editBudget}
              setEditBudget={setEditBudget}
              handleEditSubmit={handleEditSubmit}
              handleDelete={handleDelete}
              startEdit={startEdit}
              cancelEdit={cancelEdit}
              formatCurrency={formatCurrency}
            />
          ))}
        </ul>
        <p>------------------------------------</p>
      </li>
    ));
};

export default BudgetListByMonth;
