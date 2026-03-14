import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/InvoiceForm.css";

function InvoiceForm() {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    if (id) {
      axios
        .get("http://localhost:5000/api/invoices", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const invoice = res.data.find((inv) => inv._id === id);
          if (invoice) {
            setInvoiceNumber(invoice.invoiceNumber);
            setClientName(invoice.clientName);
            setDate(invoice.date.substring(0, 10));
            setAmount(invoice.amount);
            setStatus(invoice.status);
          }
        });
    } else {
      // Set today's date as default for new invoices
      const today = new Date().toISOString().substr(0, 10);
      setDate(today);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!invoiceNumber.trim()) {
      setError("Invoice number is required");
      setLoading(false);
      return;
    }
    if (!clientName.trim()) {
      setError("Client name is required");
      setLoading(false);
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError("Amount must be greater than 0");
      setLoading(false);
      return;
    }

    const invoiceData = {
      invoiceNumber,
      clientName,
      date,
      amount: parseFloat(amount),
      status,
    };

    try {
      if (id) {
        await axios.put(
          `http://localhost:5000/api/invoices/${id}`,
          invoiceData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/invoices",
          invoiceData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save invoice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="container">
        <div className="form-card">
          <div className="form-header">
            <h1>{id ? "Edit Invoice" : "Create Invoice"}</h1>
            <p>
              {id
                ? "Update invoice details below"
                : "Fill in the invoice details below"}
            </p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="invoice-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="invoiceNumber">Invoice Number *</label>
                <input
                  id="invoiceNumber"
                  type="text"
                  placeholder="e.g., INV-001"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="clientName">Client Name *</label>
                <input
                  id="clientName"
                  type="text"
                  placeholder="e.g., John Doe"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">Date *</label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount">Amount (₹) *</label>
                <input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="status">Status *</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn-submit"
                disabled={loading}
              >
                {loading
                  ? id
                    ? "Updating..."
                    : "Creating..."
                  : id
                  ? "Update Invoice"
                  : "Create Invoice"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/home")}
                className="btn-cancel"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InvoiceForm;