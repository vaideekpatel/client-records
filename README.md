# Client Records Management

A lightweight React application for client record CRUD operations directly from JSON uploads. Built with React, Redux Toolkit, Tailwind CSS, and TypeScript.

---

## Key Features

* **JSON Import & Merge**: Upload one or more JSON files; imported records are merged into the existing list and duplicate emails are automatically discarded.
* **Instant Search**: Filter by ID, name, or email on each key stroke.
* **Pagination**: Browse records in pages of 10, with serial numbers reflecting their position in the overall list.
* **Edit & Delete**: Update records in a modal form (with unique-email validation) or delete them with a confirmation dialog.
* **Notifications & Alerts**: Success messages via React-Toastify; deletions confirmed with SweetAlert2.
* **Persistence**: Records are saved to `localStorage` so your data survives refreshes.

---

## Requirements Covered

The application meets all of the original task requirements:

1. **Upload & Store**: JSON files are read in-browser and saved locally via Redux state and `redux-persist`.
2. **Unique Emails**: Duplicate email addresses in each upload are automatically filtered out.
3. **Multiple Uploads**: Data from each upload is merged into the existing client list.
4. **Paginated View**: Main screen displays records in pages, with correct serial numbering.
5. **Search on Key-Up**: The search bar listens to key events and filters results dynamically.
6. **Edit/Delete Actions**: Users can modify any record or remove it from the list.
7. **Edit Validation**: The edit form enforces unique email addresses, showing an inline error for duplicates.
8. **Immediate Updates**: When a record is deleted or edited, the table and pagination update instantly.

---

## Tech Stack

* **React 18** & **TypeScript**
* **Redux Toolkit** + **redux-persist**
* **Tailwind CSS**
* **React-Toastify** & **SweetAlert2**
* **Jest** & **React Testing Library**
* **Vite**

---

## Getting Started

1. **Clone & install**

   ```bash
   git clone https://github.com/yourusername/client-records.git
   cd client-records
   npm install
   ```

2. **Run the app**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Build for production**

   ```bash
   npm run build
   npm run preview
   ```

---

## Running Tests

```bash
npm run test
```

Covers utility functions, slice reducers, and core UI components.

---
