// API Configuration and utilities

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = {
  // File Upload
  uploadFile: async (file, page = 'general', section = 'general') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('page', page);
    formData.append('section', section);

    console.log('Uploading to:', `${API_BASE_URL}/upload`);
    console.log('FormData contents:', { file: file.name, page, section });

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData
    });
    
    console.log('Upload response status:', response.status);
    const result = await response.json();
    console.log('Upload API response:', result);
    
    if (!response.ok) {
      throw new Error(`Upload failed: ${result.error || response.statusText}`);
    }
    
    return result;
  },

  uploadMultiple: async (files, page, folder = 'gallery') => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    formData.append('folder', folder);

    const response = await fetch(`${API_BASE_URL}/page/${page}/gallery`, {
      method: 'POST',
      body: formData
    });
    return response.json();
  },

  // Page Data
  getPageData: async (page) => {
    const response = await fetch(`${API_BASE_URL}/page/${page}`);
    return response.json();
  },

  updatePageSection: async (page, section, data) => {
    const response = await fetch(`${API_BASE_URL}/page/${page}/${section}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  getGallery: async (page) => {
    const response = await fetch(`${API_BASE_URL}/page/${page}/gallery`);
    return response.json();
  },

  deleteFile: async (page, folder, filename) => {
    const response = await fetch(`${API_BASE_URL}/file/${page}/${folder}/${filename}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Bookings
  createBooking: async (bookingData) => {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    return response.json();
  },

  getBookings: async () => {
    const response = await fetch(`${API_BASE_URL}/bookings`);
    return response.json();
  },

  getBookingByContact: async (searchTerm) => {
    const response = await fetch(`${API_BASE_URL}/bookings/search?q=${encodeURIComponent(searchTerm)}`);
    return response.json();
  },

  getBooking: async (id) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`);
    return response.json();
  },

  updateBooking: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  deleteBooking: async (id) => {
    const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Users
  getUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/users`);
    return response.json();
  },

  getUser: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    return response.json();
  },

  updateUser: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  deleteUser: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Testimonials
  createTestimonial: async (testimonialData) => {
    const response = await fetch(`${API_BASE_URL}/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testimonialData)
    });
    return response.json();
  },

  getTestimonials: async (onlyApproved = false) => {
    const response = await fetch(`${API_BASE_URL}/testimonials?approved=${onlyApproved}`);
    return response.json();
  },

  updateTestimonial: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  // Newsletter
  subscribe: async (email) => {
    const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return response.json();
  },

  getSubscribers: async () => {
    const response = await fetch(`${API_BASE_URL}/newsletter/subscribers`);
    return response.json();
  },

  // Contact
  submitContact: async (contactData) => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    return response.json();
  },

  getContactSubmissions: async () => {
    const response = await fetch(`${API_BASE_URL}/contact`);
    return response.json();
  },

  getContactSubmission: async (id) => {
    const response = await fetch(`${API_BASE_URL}/contact/${id}`);
    return response.json();
  },

  // Health check
  healthCheck: async () => {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  }
};
