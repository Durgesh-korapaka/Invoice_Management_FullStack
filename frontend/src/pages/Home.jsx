import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const [invoices, setInvoices] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortType, setSortType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/invoices",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInvoices(res.data);
    } catch (err) {
      console.error("Failed to fetch invoices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/invoices/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        fetchInvoices();
      } catch (err) {
        console.error("Delete failed");
      }
    }
  };

  let filteredInvoices =
    filterStatus === "All"
      ? invoices
      : invoices.filter((inv) => inv.status === filterStatus);

  if (sortType === "date") {
    filteredInvoices.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }

  if (sortType === "amount") {
    filteredInvoices.sort((a, b) => b.amount - a.amount);
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Paid":
        return "paid";
      case "Unpaid":
        return "unpaid";
      case "Pending":
        return "pending";
      default:
        return "pending";
    }
  };

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="home-container">
      <div className="container">
        <div className="home-header">
          <div>
            <h1>Invoice Dashboard</h1>
            <p>Manage and track your invoices</p>
          </div>
          <button
            onClick={() => navigate("/invoice")}
            className="btn-add-invoice"
          >
            + Add Invoice
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <p className="stat-label">Total Invoices</p>
              <p className="stat-value">{invoices.length}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <p className="stat-label">Total Amount</p>
              <p className="stat-value">₹{totalAmount.toLocaleString()}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <p className="stat-label">Amount Received</p>
              <p className="stat-value">₹{paidAmount.toLocaleString()}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <p className="stat-label">Pending</p>
              <p className="stat-value">₹{(totalAmount - paidAmount).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="filters-section">
          <div className="filters">
            <div className="filter-group">
              <label htmlFor="status-filter">Filter by Status</label>
              <select
                id="status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Invoices</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sort-filter">Sort By</label>
              <select
                id="sort-filter"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="">Default</option>
                <option value="date">Date (Newest First)</option>
                <option value="amount">Amount (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <p>Loading invoices...</p>
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📁</div>
            <h3>No invoices found</h3>
            <p>
              {invoices.length === 0
                ? "Create your first invoice to get started"
                : "No invoices match your filter"}
            </p>
            {invoices.length === 0 && (
              <button
                onClick={() => navigate("/invoice")}
                className="btn-primary"
              >
                Create First Invoice
              </button>
            )}
          </div>
        ) : (
          <div className="invoice-grid">
            {filteredInvoices.map((invoice) => (
              <div key={invoice._id} className="invoice-item">
                <div className="invoice-header">
                  <div>
                    <p className="invoice-number">#{invoice.invoiceNumber}</p>
                    <p className="invoice-client">{invoice.clientName}</p>
                  </div>
                  <span
                    className={`status-badge ${getStatusBadgeClass(
                      invoice.status
                    )}`}
                  >
                    {invoice.status}
                  </span>
                </div>

                <div className="invoice-details">
                  <div className="detail-row">
                    <span className="detail-label">Date</span>
                    <span className="detail-value">
                      {new Date(invoice.date).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Amount</span>
                    <span className="amount">₹{invoice.amount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="invoice-actions">
                  <button
                    onClick={() => navigate(`/invoice?id=${invoice._id}`)}
                    className="btn-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(invoice._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div> 
    </div>
  );
}

export default Home;