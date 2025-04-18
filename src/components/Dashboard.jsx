import React, { useState, useEffect, useCallback } from "react";
import api from "../api";
import BudgetForm from "../components/BudgetForm";
import BudgetListByMonth from "../components/BudgetListByMonth";
import BudgetCharts from "../components/BudgetCharts";

const Dashboard = () => {
  const [budgetItems, setBudgetItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");
  const [_userId, setUserId] = useState("");
  const [newBudget, setNewBudget] = useState({
    name: "",
    value: "",
    month: "",
    year: new Date().getFullYear(),
  });
  const [editingId, setEditingId] = useState(null);
  const [editBudget, setEditBudget] = useState({
    name: "",
    value: "",
    month: "",
    year: new Date().getFullYear(),
  });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [availableYears, setAvailableYears] = useState([]);

  const monthOrder = [
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

  const generateRandomColors = (num) => {
    return Array.from(
      { length: num },
      () => `hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`
    );
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("sr-RS", {
      style: "currency",
      currency: "RSD",
      minimumFractionDigits: 0,
    });
  };

  const fetchUserData = useCallback(async () => {
    try {
      const userResponse = await api.get("/auth/me");
      const { user_role, id } = userResponse.data;
      setUserRole(user_role);
      setUserId(id);
    } catch {
      setError("Error fetching user info.");
    }
  }, []);

  const fetchBudget = useCallback(async () => {
    try {
      const response = await api.get("/budget/");
      setBudgetItems(response.data || []);
      const years = [...new Set(response.data.map((item) => item.year))].sort();
      setAvailableYears(years);
      if (!years.includes(selectedYear)) {
        setSelectedYear(years[0]);
      }
    } catch {
      setError("Error fetching budget items.");
    }
  }, [selectedYear]);

  const fetchUsers = useCallback(async () => {
    try {
      const usersResponse = await api.get("/admin/users");
      setUsers(usersResponse.data || []);
    } catch {
      setError("Error fetching users.");
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (userRole) {
      if (userRole !== "admin") {
        fetchBudget();
      } else {
        fetchUsers();
      }
    }
  }, [userRole, fetchBudget, fetchUsers]);

  const handleDelete = async (budgetId) => {
    try {
      await api.delete(`/budget/item/${budgetId}`);
      setBudgetItems(budgetItems.filter((item) => item.id !== budgetId));
    } catch {
      setError("Error deleting the budget item.");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/budget/item", newBudget);
      fetchBudget();
      setNewBudget({
        name: "",
        value: "",
        month: "",
        year: new Date().getFullYear(),
      });
    } catch {
      setError("Error creating budget item.");
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditBudget({
      name: item.name,
      value: item.value,
      month: item.month,
      year: item.year,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/budget/item/${editingId}`, editBudget);
      setEditingId(null);
      fetchBudget();
    } catch {
      setError("Error updating budget item.");
    }
  };

  const handleUserDelete = async (userId) => {
    try {
      await api.delete(`/admin/user/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch {
      setError("Error deleting the user.");
    }
  };

  const groupByMonth = (items) => {
    const grouped = {};
    items.forEach((item) => {
      if (item.year !== selectedYear) return;
      const monthKey = item.month.toLowerCase();
      if (!grouped[monthKey]) {
        grouped[monthKey] = { total: 0, items: [] };
      }
      grouped[monthKey].total += item.value;
      grouped[monthKey].items.push(item);
    });
    return grouped;
  };

  const getMonthlyTotals = () => {
    const totals = monthOrder.map((month) => {
      const monthItems = budgetItems.filter(
        (item) =>
          item.month.toLowerCase() === month && item.year === selectedYear
      );
      return monthItems.reduce((sum, item) => sum + item.value, 0);
    });

    return {
      labels: monthOrder.map((m) => m.charAt(0).toUpperCase() + m.slice(1)),
      datasets: [
        {
          label: `Monthly expenses for ${selectedYear}`,
          data: totals,
          backgroundColor: "#de4a4e",
          borderColor: "#de4a4e",
          borderWidth: 1,
        },
      ],
    };
  };

  const getMonthlyPieData = () => {
    const monthlyData = monthOrder.map((month) => {
      const items = budgetItems.filter(
        (item) =>
          item.month.toLowerCase() === month && item.year === selectedYear
      );
      return items.reduce((sum, item) => sum + item.value, 0);
    });

    return {
      labels: monthOrder.map((m) => m.charAt(0).toUpperCase() + m.slice(1)),
      datasets: [
        {
          data: monthlyData,
          backgroundColor: generateRandomColors(monthOrder.length),
          hoverOffset: 4,
        },
      ],
    };
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p style={{ color: "white" }}>{error}</p>}

      {userRole !== "admin" ? (
        <>
          <div className="flex-cont">
            <div className="c-left">
              <BudgetForm
                newBudget={newBudget}
                setNewBudget={setNewBudget}
                handleCreate={handleCreate}
              />
              <ul className="budget-list">
                <h2 className="green-t">Entries by months</h2>
                {budgetItems.length > 0 ? (
                  <BudgetListByMonth
                    groupedItems={groupByMonth(budgetItems)}
                    monthOrder={monthOrder}
                    editingId={editingId}
                    editBudget={editBudget}
                    setEditBudget={setEditBudget}
                    handleEditSubmit={handleEditSubmit}
                    handleDelete={handleDelete}
                    startEdit={startEdit}
                    cancelEdit={() => setEditingId(null)}
                    formatCurrency={formatCurrency}
                  />
                ) : (
                  <p>No budget items found.</p>
                )}
              </ul>
            </div>

            <div className="c-right">
              <BudgetCharts
                selectedYear={selectedYear}
                getMonthlyTotals={getMonthlyTotals}
                getMonthlyPieData={getMonthlyPieData}
              />

              <div>
                <label htmlFor="year-select">Choose Year</label>
                <select
                  id="year-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                >
                  {availableYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="green-t">Users</h2>
          <ul>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <li key={user.id}>
                  <p>{user.username}</p>
                  {user.role !== "admin" && (
                    <button onClick={() => handleUserDelete(user.id)}>
                      Delete User
                    </button>
                  )}
                  <p>------------------------------------</p>
                </li>
              ))
            ) : (
              <p>No users available.</p>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Dashboard;
