

import React, { useState } from "react";
import { apiClient } from "../services/api";

// Modern-classic Book page redesign
export default function Book() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    service: "",
    eventType: "",
    location: "",
    address: "",
    photographer: "",
    budget: "",
    referenceImages: null,
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Booking status checker state
  const [statusSearch, setStatusSearch] = useState("");
  const [statusResults, setStatusResults] = useState([]);
  const [statusSearching, setStatusSearching] = useState(false);
  const [statusError, setStatusError] = useState("");
  const [showStatusSection, setShowStatusSection] = useState(false);

  // Accordion state for folding cards
  const [openCard, setOpenCard] = useState(null);
  const toggleCard = (id) => setOpenCard(openCard === id ? null : id);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "referenceImages") {
      console.log('Files selected:', files ? files.length : 0);
      if (files && files.length > 0) {
        console.log('File names:', Array.from(files).map(f => f.name));
      }
      setForm({ ...form, referenceImages: files });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Valid email is required.";
    if (!form.phone.trim() || !/^\d{10,}$/.test(form.phone)) errs.phone = "Valid phone is required.";
    if (!form.date) errs.date = "Date is required.";
    if (!form.service) errs.service = "Please select a service.";
    if (!form.eventType.trim()) errs.eventType = "Event type is required.";
    if (!form.location.trim()) errs.location = "Location is required.";
    if (!form.budget.trim()) errs.budget = "Budget is required.";
    if (!form.address.trim()) errs.address = "Address is required.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      // First upload reference images if any
      let uploadedImageUrls = [];
      if (form.referenceImages && form.referenceImages.length > 0) {
        console.log('Uploading', form.referenceImages.length, 'reference images...');
        
        const uploadPromises = Array.from(form.referenceImages).map(async (file) => {
          try {
            const result = await apiClient.uploadFile(file, 'bookings', 'references');
            console.log('Single upload result:', result);
            return result;
          } catch (error) {
            console.error('Upload failed for file:', file.name, error);
            return null;
          }
        });
        
        const uploadResults = await Promise.all(uploadPromises);
        console.log('All upload results:', uploadResults);
        
        uploadedImageUrls = uploadResults
          .filter(result => result && result.success)
          .map(result => result.file?.path || result.file?.url || result.path || result.url)
          .filter(Boolean);
        
        console.log('Final uploaded image URLs:', uploadedImageUrls);
        
        if (uploadedImageUrls.length === 0 && form.referenceImages.length > 0) {
          console.error('WARNING: Files were selected but no URLs were extracted!');
          console.log('This might indicate an upload failure or response format issue.');
        }
      }

      // Create booking with image URLs
      const bookingData = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        eventDate: form.date,
        eventType: form.service,
        location: form.location,
        budget: form.budget,
        description: `Event Type: ${form.eventType}\nAddress: ${form.address}\nPhotographer: ${form.photographer}\nMessage: ${form.message}`,
        referenceImages: uploadedImageUrls
      };
      console.log('Creating booking with data:', bookingData);
      await apiClient.createBooking(bookingData);
      setSubmitted(true);
    } catch (error) {
      console.error('Booking error:', error);
      setSubmitError("Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusSearch = async (e) => {
    e.preventDefault();
    if (!statusSearch.trim()) {
      setStatusError("Please enter your email or phone number");
      return;
    }

    setStatusSearching(true);
    setStatusError("");
    setStatusResults([]);

    try {
      console.log('Searching for:', statusSearch);
      const results = await apiClient.getBookingByContact(statusSearch);
      console.log('Search results:', results);
      
      if (Array.isArray(results)) {
        setStatusResults(results);
        if (results.length === 0) {
          setStatusError("No bookings found with this email or phone number");
        }
      } else {
        console.error('Invalid response format:', results);
        setStatusError("Invalid response from server. Please try again.");
      }
    } catch (error) {
      console.error('Search error:', error);
      setStatusError("Failed to search bookings. Please try again.");
    } finally {
      setStatusSearching(false);
    }
  };

  // Auto-refresh bookings every 5 seconds when viewing results
  React.useEffect(() => {
    if (!statusResults.length || !statusSearch.trim()) return;

    const intervalId = setInterval(async () => {
      try {
        const results = await apiClient.getBookingByContact(statusSearch);
        setStatusResults(results);
      } catch (error) {
        // Silently fail, don't disrupt user experience
      }
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(intervalId);
  }, [statusResults.length, statusSearch]);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
      completed: 'bg-green-100 text-green-800 border-green-300',
      cancelled: 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f7e9e1] via-[#fff8f3] to-[#f7f7fa] overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative w-full flex items-center justify-center py-16 md:py-24 overflow-hidden">
        {/* Animated Accent Icon + Ring */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
          <div className="relative flex items-center justify-center">
            {/* Animated ring */}
            <span className="absolute w-56 h-56 rounded-full border-4 border-[#FF0000]/30 animate-pulse-slow" style={{boxShadow:'0 0 0 8px #ffbaba33, 0 0 32px 0 #ff000033'}}></span>
            {/* Custom SVG: Camera with heart lens */}
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="drop-shadow-xl animate-float-slow">
              <rect x="20" y="40" width="80" height="50" rx="16" fill="#fff" stroke="#FF0000" strokeWidth="3"/>
              <circle cx="60" cy="65" r="18" fill="#fff" stroke="#FF0000" strokeWidth="3"/>
              <path d="M60 75c-4-3-10-7-10-12a10 10 0 0 1 20 0c0 5-6 9-10 12z" fill="#FFBABA" stroke="#FF0000" strokeWidth="2"/>
              <rect x="48" y="32" width="24" height="12" rx="6" fill="#fff" stroke="#FF0000" strokeWidth="2"/>
              <circle cx="90" cy="48" r="4" fill="#FFBABA" stroke="#FF0000" strokeWidth="2"/>
            </svg>
          </div>
        </div>
        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto px-6">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl px-10 py-10 border border-[#FF0000]/20" style={{boxShadow: '0 8px 32px 0 rgba(255,0,0,0.10), 0 0 24px 4px #FF0000AA'}}>
            <h1 className="text-4xl md:text-5xl font-serif italic font-extrabold text-[#FF0000] mb-4 drop-shadow-lg tracking-tight">Book Your Experience</h1>
            <p className="text-gray-700 text-lg md:text-xl font-medium mb-4">Reserve your session with our creative team and make your moments timeless. Choose your service, tell us your vision, and let’s create magic together.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <button onClick={() => document.getElementById('book-form-section').scrollIntoView({behavior:'smooth'})} className="px-8 py-3 bg-[#FF0000] text-white font-bold rounded-full shadow-lg hover:bg-white hover:text-[#FF0000] border-2 border-[#FF0000] transition-all text-lg">Start Booking</button>
              <button onClick={() => setShowStatusSection(!showStatusSection)} className="px-8 py-3 bg-white text-[#FF0000] font-bold rounded-full shadow-lg hover:bg-[#FF0000] hover:text-white border-2 border-[#FF0000] transition-all text-lg">Check Booking Status</button>
            </div>
          </div>
        </div>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30" style={{backgroundImage:'url("/assets/pattern.svg")', backgroundRepeat:'repeat', backgroundSize:'400px'}}></div>
      </div>

      {/* Booking Status Checker Section */}
      {showStatusSection && (
        <section className="flex items-center justify-center py-10 px-2 md:px-8 bg-gradient-to-br from-[#fff8f3] to-[#f7f7fa]">
          <div className="w-full max-w-4xl rounded-3xl shadow-2xl border border-[#FF0000]/20 bg-white/90 backdrop-blur-xl p-8 md:p-10">
            <h2 className="text-3xl md:text-4xl font-serif italic font-bold text-[#FF0000] mb-4 text-center">Check Your Booking Status</h2>
            <p className="text-gray-600 text-center mb-8">Enter your email or phone number to view your booking details</p>
            
            <form onSubmit={handleStatusSearch} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={statusSearch}
                  onChange={(e) => setStatusSearch(e.target.value)}
                  placeholder="Enter your email or phone number"
                  className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:border-[#FF0000] text-lg"
                />
                <button
                  type="submit"
                  disabled={statusSearching}
                  className={`px-8 py-3 font-bold rounded-lg shadow-lg border-2 border-[#FF0000] transition-all text-lg ${statusSearching ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-[#FF0000] text-white hover:bg-white hover:text-[#FF0000]'}`}
                >
                  {statusSearching ? 'Searching...' : 'Search'}
                </button>
              </div>
              {statusError && (
                <p className="text-red-600 mt-4 text-center font-semibold">{statusError}</p>
              )}
            </form>

            {statusResults.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">Your Bookings</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      Auto-updating
                    </span>
                    <button
                      onClick={() => handleStatusSearch({ preventDefault: () => {} })}
                      disabled={statusSearching}
                      className="px-4 py-2 bg-[#FF0000] text-white font-semibold rounded-lg hover:bg-white hover:text-[#FF0000] border-2 border-[#FF0000] transition-all disabled:opacity-50"
                    >
                      {statusSearching ? 'Refreshing...' : '🔄 Refresh Now'}
                    </button>
                  </div>
                </div>
                {statusResults.map((booking) => (
                  <div key={booking._id} className="border-2 border-gray-200 rounded-2xl p-6 bg-gradient-to-r from-white to-gray-50 shadow-lg hover:shadow-xl transition-all">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-gray-800 mb-1 capitalize">{booking.eventType}</h4>
                        <p className="text-gray-600">Event Date: <span className="font-semibold">{formatDate(booking.eventDate)}</span></p>
                      </div>
                      <div className={`mt-3 md:mt-0 inline-block px-4 py-2 rounded-full border-2 font-bold text-lg ${getStatusColor(booking.status)}`}>
                        {booking.status.toUpperCase()}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                      <div>
                        <p className="mb-2"><span className="font-semibold text-gray-800">Name:</span> {booking.name}</p>
                        <p className="mb-2"><span className="font-semibold text-gray-800">Email:</span> {booking.email}</p>
                        <p className="mb-2"><span className="font-semibold text-gray-800">Phone:</span> {booking.phone}</p>
                      </div>
                      <div>
                        <p className="mb-2"><span className="font-semibold text-gray-800">Location:</span> {booking.location}</p>
                        <p className="mb-2"><span className="font-semibold text-gray-800">Budget:</span> {booking.budget}</p>
                        <p className="mb-2"><span className="font-semibold text-gray-800">Booked On:</span> {formatDate(booking.createdAt)}</p>
                      </div>
                    </div>
                    {booking.notes && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="font-semibold text-gray-800 mb-1">📝 Admin Notes:</p>
                        <p className="text-gray-600 italic">{booking.notes}</p>
                      </div>
                    )}
                    {booking.referenceImages && booking.referenceImages.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="font-semibold text-gray-800 mb-3">🖼️ Your Reference Images ({booking.referenceImages.length}):</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {booking.referenceImages.map((imageUrl, index) => (
                            <a
                              key={index}
                              href={imageUrl.startsWith('http') ? imageUrl : `http://localhost:5000${imageUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block"
                            >
                              <img
                                src={imageUrl.startsWith('http') ? imageUrl : `http://localhost:5000${imageUrl}`}
                                alt={`Reference ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border-2 border-gray-300 hover:border-[#FF0000] transition-all shadow-md hover:shadow-lg"
                              />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Main Booking Section */}
      <section id="book-form-section" className="flex items-center justify-center py-16 px-2 md:px-8">
        <div className="w-full max-w-6xl rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-[#FF0000]/20 bg-white/90 backdrop-blur-xl">
          {/* Left: Studio/Event Info */}
          <div className="md:w-1/2 w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#fff0f0] to-[#ffeaea] p-10 gap-8 relative">
            <img
              src="/album1.jpg"
              alt="Book a session"
              className="rounded-2xl shadow-xl w-full h-80 object-cover border-4 border-[#FF0000] mb-4 animate-float"
              loading="lazy"
            />
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-serif italic font-bold text-[#FF0000] mb-2">Welcome to StudioX</h2>
              <p className="text-gray-700 mb-4">Book your next session with our professional team and experience creative photography, videography, and more. We offer custom packages for every occasion!</p>
              <ul className="text-left text-gray-600 text-base space-y-2 mx-auto max-w-xs">
                <li><span className="font-bold text-[#FF0000]">•</span> Weddings, portraits, events, and more</li>
                <li><span className="font-bold text-[#FF0000]">•</span> State-of-the-art equipment</li>
                <li><span className="font-bold text-[#FF0000]">•</span> Friendly, creative, and experienced staff</li>
                <li><span className="font-bold text-[#FF0000]">•</span> Fast turnaround & easy online booking</li>
              </ul>
            </div>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF0000]/60 to-transparent"></div>
          </div>
          {/* Right: Booking Form */}
          <div className="md:w-1/2 w-full p-10 flex flex-col justify-center bg-white/80">
            <h1 className="text-3xl md:text-4xl font-serif italic font-bold text-[#FF0000] mb-6 text-center md:text-left">Book a Session</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-[#FF0000] to-[#ffbaba] rounded-full mb-8 mx-auto md:mx-0"></div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center min-h-45">
                <svg className="mb-4" width="56" height="56" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#22c55e" opacity="0.15"/><path d="M7 13l3 3 7-7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div className="bg-green-100 text-green-800 px-6 py-4 rounded shadow text-xl font-semibold text-center">
                  Thank you for booking!<br/>We will contact you soon.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* ...existing code for form fields... */}
                  <div>
                    <label className="block font-semibold mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF0000] ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Your Name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF0000] ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Your Email"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF0000] ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Your Phone Number"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF0000] ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Service</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF0000] ${errors.service ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      <option value="">Select a service</option>
                      <option value="wedding">Wedding Photography</option>
                      <option value="portrait">Portrait Session</option>
                      <option value="event">Event Coverage</option>
                      <option value="product">Product Shoot</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Event Type</label>
                    <input
                      type="text"
                      name="eventType"
                      value={form.eventType}
                      onChange={handleChange}
                      className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF0000] ${errors.eventType ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="e.g. Wedding, Birthday, Corporate, etc."
                    />
                    {errors.eventType && <p className="text-red-500 text-xs mt-1">{errors.eventType}</p>}
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF0000] ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Event Location"
                    />
                    {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF0000] ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Full Address"
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Preferred Photographer (optional)</label>
                    <input
                      type="text"
                      name="photographer"
                      value={form.photographer}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF0000] border-gray-300"
                      placeholder="Photographer Name (if any)"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Budget</label>
                    <input
                      type="text"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF0000] ${errors.budget ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Your Budget (e.g. 10000)"
                    />
                    {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-semibold mb-1">Reference Images (optional)</label>
                    <input
                      type="file"
                      name="referenceImages"
                      multiple
                      accept="image/*"
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF0000] border-gray-300"
                    />
                    {form.referenceImages && form.referenceImages.length > 0 && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {form.referenceImages.length} image{form.referenceImages.length > 1 ? 's' : ''} selected
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-semibold mb-1">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF0000] border-gray-300"
                      placeholder="Tell us more about your session..."
                      rows={3}
                    />
                  </div>
                </div>
                {submitError && (
                  <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm">
                    {submitError}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full font-bold py-3 rounded-lg shadow-lg border-2 border-[#FF0000] transition-all text-lg mt-2 ${submitting ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-[#FF0000] text-white hover:bg-white hover:text-[#FF0000]'}`}
                >
                  {submitting ? 'Submitting...' : 'Book Now'}
                </button>
              </form>
            )}
          </div>
        </div>

      </section>

      {/* Full-width Folding Cards Section */}
      <section className="w-full flex flex-col gap-6 py-10 px-2 md:px-8 bg-gradient-to-br from-[#fff1f1] to-[#f7f7fa]">
        {/* Guidelines Card */}
        <div className={`transition-all duration-300 w-full max-w-7xl mx-auto rounded-3xl shadow-xl border border-[#FF0000]/20 bg-white/80 backdrop-blur-xl overflow-hidden ${openCard === 1 ? 'ring-4 ring-[#FFBABA]/40' : ''}`}>
          <button onClick={() => toggleCard(1)} className="w-full flex items-center justify-between px-8 py-6 focus:outline-none group">
            <span className="text-2xl md:text-3xl font-serif italic font-bold text-[#FF0000]">Guidelines & Important Points</span>
            <svg className={`w-8 h-8 transition-transform duration-300 ${openCard === 1 ? 'rotate-180' : ''}`} fill="none" stroke="#FF0000" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div className={`transition-all duration-300 px-8 pb-8 ${openCard === 1 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'} overflow-hidden`}> 
            <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
              <li>Ensure all required fields are filled accurately for a smooth booking process.</li>
              <li>Bookings are subject to availability. We recommend booking at least 2 weeks in advance.</li>
              <li>After submitting, our team will contact you to confirm your session and discuss details.</li>
              <li>Reference images help us understand your vision—upload if possible.</li>
              <li>For urgent bookings or special requests, mention them in the message box.</li>
              <li>All information is kept confidential and used only for your session planning.</li>
              <li className="font-semibold text-[#FF0000]">Contact us directly for any questions or custom requirements!</li>
            </ul>
          </div>
        </div>
        {/* Terms & Policy Card */}
        <div className={`transition-all duration-300 w-full max-w-7xl mx-auto rounded-3xl shadow-xl border border-[#FF0000]/20 bg-white/80 backdrop-blur-xl overflow-hidden ${openCard === 2 ? 'ring-4 ring-[#FFBABA]/40' : ''}`}>
          <button onClick={() => toggleCard(2)} className="w-full flex items-center justify-between px-8 py-6 focus:outline-none group">
            <span className="text-2xl md:text-3xl font-serif italic font-bold text-[#FF0000]">Terms & Policy</span>
            <svg className={`w-8 h-8 transition-transform duration-300 ${openCard === 2 ? 'rotate-180' : ''}`} fill="none" stroke="#FF0000" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div className={`transition-all duration-300 px-8 pb-8 ${openCard === 2 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'} overflow-hidden`}>
            <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
              <li>All bookings are subject to confirmation and availability.</li>
              <li>A non-refundable deposit may be required to secure your session.</li>
              <li>Rescheduling is allowed up to 48 hours before your session, subject to availability.</li>
              <li>Client data is handled securely and used only for booking and communication purposes.</li>
              <li>By booking, you agree to our studio’s code of conduct and property care guidelines.</li>
              <li>Full terms and privacy policy are available upon request or on our website.</li>
              <li className="font-semibold text-[#FF0000]">Contact us for any clarification regarding our terms or your privacy.</li>
            </ul>
          </div>
        </div>
      </section>
      
    </div>
  );
}

