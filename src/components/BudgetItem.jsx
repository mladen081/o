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
  return editingId === item.id ? (
    <li>
      <form onSubmit={handleEditSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={editBudget.name}
            onChange={(e) =>
              setEditBudget({ ...editBudget, name: e.target.value })
            }
          />
        </div>
        <div>
          <label>Value</label>
          <input
            type="number"
            value={editBudget.value}
            onChange={(e) =>
              setEditBudget({ ...editBudget, value: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <label>Month</label>
          <input
            type="text"
            value={editBudget.month}
            onChange={(e) =>
              setEditBudget({ ...editBudget, month: e.target.value })
            }
          />
        </div>
        <div>
          <label>Year</label>
          <input
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
        {item.name} - {formatCurrency(item.value)}
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
