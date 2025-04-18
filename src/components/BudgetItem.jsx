import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

const BudgetItem = ({
  item,
  editingId,
  editBudget,
  setEditBudget,
  handleEditSubmit,
  handleDelete,
  startEdit,
  cancelEdit,
  formatCurrency,
}) => {
  const months = [
    "januar",
    "februar",
    "mart",
    "april",
    "maj",
    "jun",
    "jul",
    "avgust",
    "septembar",
    "oktobar",
    "novembar",
    "decembar",
  ];

  return editingId === item.id ? (
    <li>
      <form onSubmit={handleEditSubmit}>
        <div>
          <label htmlFor="edit-name">Name</label>
          <input
            id="edit-name"
            type="text"
            value={editBudget.name}
            onChange={(e) =>
              setEditBudget({ ...editBudget, name: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="edit-value">Value</label>
          <input
            id="edit-value"
            type="text"
            value={editBudget.value}
            onChange={(e) =>
              setEditBudget({ ...editBudget, value: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <label htmlFor="edit-month">Month</label>
          <select
            id="edit-month"
            value={editBudget.month}
            onChange={(e) =>
              setEditBudget({ ...editBudget, month: e.target.value })
            }
          >
            <option value="">-- Choose Month--</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month.charAt(0).toUpperCase() + month.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="edit-year">Year</label>
          <input
            id="edit-year"
            type="number"
            value={editBudget.year}
            onChange={(e) =>
              setEditBudget({ ...editBudget, year: Number(e.target.value) })
            }
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={cancelEdit}>
          Cancel
        </button>
      </form>
    </li>
  ) : (
    <li>
      <p>
        {item.name} - {formatCurrency(item.value)} - {item.month} {item.year}
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => startEdit(item)}
          title="Izmeni"
          className="icon-btn edit"
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => handleDelete(item.id)}
          title="Obriši"
          className="icon-btn delete"
        />
      </p>
    </li>
  );
};

export default BudgetItem;
