import { useState, useEffect, useRef } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const COUNTRY_CODES = [
  {
    code: "+1",
    country: "USA/Canada",
    flag: "🇺🇸",
    minLength: 10,
    maxLength: 10,
  },
  { code: "+44", country: "UK", flag: "🇬🇧", minLength: 10, maxLength: 10 },
  { code: "+91", country: "India", flag: "🇮🇳", minLength: 10, maxLength: 10 },
  { code: "+61", country: "Australia", flag: "🇦🇺", minLength: 9, maxLength: 9 },
  { code: "+81", country: "Japan", flag: "🇯🇵", minLength: 10, maxLength: 10 },
  { code: "+86", country: "China", flag: "🇨🇳", minLength: 11, maxLength: 11 },
  { code: "+49", country: "Germany", flag: "🇩🇪", minLength: 10, maxLength: 11 },
  { code: "+33", country: "France", flag: "🇫🇷", minLength: 9, maxLength: 9 },
  { code: "+39", country: "Italy", flag: "🇮🇹", minLength: 9, maxLength: 10 },
  { code: "+34", country: "Spain", flag: "🇪🇸", minLength: 9, maxLength: 9 },
  { code: "+7", country: "Russia", flag: "🇷🇺", minLength: 10, maxLength: 10 },
  { code: "+55", country: "Brazil", flag: "🇧🇷", minLength: 10, maxLength: 11 },
  { code: "+52", country: "Mexico", flag: "🇲🇽", minLength: 10, maxLength: 10 },
  {
    code: "+82",
    country: "South Korea",
    flag: "🇰🇷",
    minLength: 9,
    maxLength: 10,
  },
  {
    code: "+27",
    country: "South Africa",
    flag: "🇿🇦",
    minLength: 9,
    maxLength: 9,
  },
  { code: "+971", country: "UAE", flag: "🇦🇪", minLength: 9, maxLength: 9 },
  { code: "+65", country: "Singapore", flag: "🇸🇬", minLength: 8, maxLength: 8 },
  {
    code: "+64",
    country: "New Zealand",
    flag: "🇳🇿",
    minLength: 8,
    maxLength: 10,
  },
  {
    code: "+31",
    country: "Netherlands",
    flag: "🇳🇱",
    minLength: 9,
    maxLength: 9,
  },
  { code: "+46", country: "Sweden", flag: "🇸🇪", minLength: 9, maxLength: 10 },
];

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    countryCode: "+1",
    phone: "",
    message: "",
  });
  const [editing, setEditing] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const [search, setSearch] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const carouselRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  function getInitials(name) {
    const safe = (name || "").trim();
    if (!safe) return "?";
    const parts = safe.split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] || "";
    const last = (parts.length > 1 ? parts[parts.length - 1]?.[0] : "") || "";
    return (first + last).toUpperCase();
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/contacts`);
      if (!res.ok) throw new Error("Failed to fetch contacts");
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhoneNumber(countryCode, phone) {
    const cleanPhone = phone.replace(/[\s\-()]/g, "");

    if (!/^\d+$/.test(cleanPhone)) {
      return { valid: false, message: "Phone must contain only digits" };
    }

    const country = COUNTRY_CODES.find((c) => c.code === countryCode);
    if (!country) {
      return {
        valid: cleanPhone.length >= 7 && cleanPhone.length <= 15,
        message: "Phone must be 7-15 digits",
      };
    }

    if (
      cleanPhone.length < country.minLength ||
      cleanPhone.length > country.maxLength
    ) {
      if (country.minLength === country.maxLength) {
        return {
          valid: false,
          message: `${country.country} requires exactly ${country.minLength} digits`,
        };
      } else {
        return {
          valid: false,
          message: `${country.country} requires ${country.minLength}-${country.maxLength} digits`,
        };
      }
    }

    return { valid: true, message: "" };
  }

  function validateForm() {
    if (!form.name.trim()) return false;
    if (!form.email.trim()) return false;
    if (!validateEmail(form.email)) return false;
    if (!form.phone.trim()) return false;

    const phoneValidation = validatePhoneNumber(form.countryCode, form.phone);
    return phoneValidation.valid;
  }

  function handlePhoneChange(e) {
    const value = e.target.value;
    setForm({ ...form, phone: value });

    if (value.trim()) {
      const validation = validatePhoneNumber(form.countryCode, value);
      setPhoneError(validation.valid ? "" : validation.message);
    } else {
      setPhoneError("");
    }
  }

  function handleCountryCodeChange(e) {
    const code = e.target.value;
    setForm({ ...form, countryCode: code });

    if (form.phone.trim()) {
      const validation = validatePhoneNumber(code, form.phone);
      setPhoneError(validation.valid ? "" : validation.message);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!form.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!form.phone.trim()) {
      setError("Phone number is required");
      return;
    }

    const phoneValidation = validatePhoneNumber(form.countryCode, form.phone);
    if (!phoneValidation.valid) {
      setError(phoneValidation.message);
      return;
    }

    try {
      if (editing) {
        const res = await fetch(`${API_URL}/contacts/${editing._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Failed to update contact");
        setSuccess("Contact updated successfully!");
      } else {
        const res = await fetch(`${API_URL}/contacts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Failed to create contact");
        setSuccess("Contact added successfully!");
      }

      setForm({
        name: "",
        email: "",
        countryCode: "+1",
        phone: "",
        message: "",
      });
      setEditing(null);
      setPhoneError("");
      fetchContacts();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this contact?")) return;
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${API_URL}/contacts/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete contact");
      setSuccess("Contact deleted successfully!");
      fetchContacts();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  }

  function handleEdit(contact) {
    // Ensure countryCode is a string, not an object
    const code =
      typeof contact.countryCode === "string"
        ? contact.countryCode
        : contact.countryCode?.code || "+1";

    setForm({
      name: contact.name,
      email: contact.email || "",
      countryCode: code,
      phone: contact.phone || "",
      message: contact.message || "",
    });
    setEditing(contact);
    setSuccess("");
    setError("");
    setPhoneError("");
  }

  function handleCancel() {
    setForm({ name: "", email: "", countryCode: "+1", phone: "", message: "" });
    setEditing(null);
    setError("");
    setPhoneError("");
  }

  function getFilteredContacts() {
    const q = search.trim().toLowerCase();
    if (!q) return contacts;

    return contacts.filter((c) => {
      const countryCode =
        typeof c.countryCode === "string"
          ? c.countryCode
          : c.countryCode?.code || "";
      const haystack = [
        c.name,
        c.email,
        `${countryCode} ${c.phone || ""}`,
        c.phone,
        c.message,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }

  function getSortedContacts(list) {
    const sorted = [...list];
    switch (sortBy) {
      case "newest":
        return sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest":
        return sorted.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  }

  function updateCarouselControls() {
    const el = carouselRef.current;
    if (!el) return;

    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const left = el.scrollLeft;

    setCanScrollPrev(left > 1);
    setCanScrollNext(maxScrollLeft - left > 1);
  }

  function scrollCarousel(direction) {
    const el = carouselRef.current;
    if (!el) return;
    const amount = Math.max(240, Math.floor(el.clientWidth * 0.9));
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  const visibleContacts = getSortedContacts(getFilteredContacts());

  useEffect(() => {
    updateCarouselControls();
    const handleResize = () => updateCarouselControls();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [visibleContacts.length, sortBy, search]);

  return (
    <div className="app">
      <header className="page-header">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            📇
          </div>
          <div>
            <h1>Contact Management</h1>
            <p className="subtitle">
              Create, validate, and manage contacts — fast and clean.
            </p>
          </div>
        </div>

        {contacts.length > 0 && (
          <div className="stats">
            <p>Total Contacts</p>
            <span>{contacts.length}</span>
          </div>
        )}
      </header>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-header">
          <div>
            <h2>{editing ? "Edit contact" : "Add a new contact"}</h2>
            <p>All fields are validated before saving.</p>
          </div>
          {editing && <span className="badge">Editing</span>}
        </div>

        <div className="form-grid">
          <label className="field">
            <span className="label">Name</span>
            <input
              type="text"
              placeholder="e.g. Alex Johnson"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </label>

          <label className="field">
            <span className="label">Email</span>
            <input
              type="email"
              placeholder="e.g. alex@company.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>

          <label className="field field--full">
            <span className="label">Phone</span>
            <div className="phone-input-group">
              <select
                value={form.countryCode}
                onChange={handleCountryCodeChange}
                className="country-select"
              >
                {COUNTRY_CODES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.code} {country.country}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                placeholder="Digits only"
                value={form.phone}
                onChange={handlePhoneChange}
                className="phone-input"
                required
              />
            </div>
            {phoneError && <div className="phone-error">{phoneError}</div>}
          </label>

          <label className="field field--full">
            <span className="label">Message</span>
            <textarea
              placeholder="Optional note (e.g. meeting follow-up, preferred contact time)"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows="3"
            />
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={!validateForm()}>
            {editing ? "Update" : "Add"} Contact
          </button>
          {editing && (
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {contacts.length > 0 && (
        <div className="list-header">
          <div>
            <h2>Contacts</h2>
            <p>Manage your saved contacts below.</p>
          </div>
          <div className="sort-controls">
            <input
              type="search"
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contacts..."
              aria-label="Search contacts"
            />
            <label>Sort by</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      )}

      {loading ? (
        <p className="loading">Loading...</p>
      ) : contacts.length === 0 ? (
        <p className="empty">No contacts yet. Add one above!</p>
      ) : visibleContacts.length === 0 ? (
        <p className="empty">No matching contacts.</p>
      ) : (
        <div className="carousel" aria-label="Contacts carousel">
          <button
            type="button"
            className="carousel-btn"
            onClick={() => scrollCarousel(-1)}
            disabled={!canScrollPrev}
            aria-label="Previous contacts"
          >
            ‹
          </button>

          <div
            className="carousel-viewport"
            ref={carouselRef}
            onScroll={updateCarouselControls}
          >
            <div className="carousel-track">
              {visibleContacts.map((contact) => (
                <div key={contact._id} className="carousel-slide">
                  <div className="contact-card">
                    <div className="contact-info">
                      <div className="contact-header">
                        <div className="avatar" aria-hidden="true">
                          {getInitials(contact.name)}
                        </div>
                        <div className="contact-title">
                          <h3>{contact.name}</h3>
                        </div>
                      </div>
                      {contact.email && (
                        <p className="meta-row meta-email">
                          <span className="meta-label">Email</span>
                          <span className="meta-value">{contact.email}</span>
                        </p>
                      )}
                      {contact.phone && (
                        <p className="meta-row meta-phone">
                          <span className="meta-label">Phone</span>
                          <span className="meta-value">
                            {typeof contact.countryCode === "string"
                              ? contact.countryCode
                              : contact.countryCode?.code || "+1"}{" "}
                            {contact.phone}
                          </span>
                        </p>
                      )}
                      {contact.message && (
                        <p className="meta-row meta-message">
                          <span className="meta-label">Note</span>
                          <span className="meta-value">{contact.message}</span>
                        </p>
                      )}
                    </div>
                    <div className="contact-actions">
                      <button
                        onClick={() => handleEdit(contact)}
                        className="edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="carousel-btn"
            onClick={() => scrollCarousel(1)}
            disabled={!canScrollNext}
            aria-label="Next contacts"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
