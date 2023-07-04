# manage-cars

Manage Cars is a web application that allows users to manage a list of cars. It provides features for adding new cars, editing car details, and searching for cars based on various criteria.

## Features

1. Table with Cars List:
   - Display columns: Company, Model, VIN, Color, Year, Price, Availability, Actions.
   - Pagination: Local pagination for the table.
   - Search: Search functionality across all entries, not just the current page.

2. Actions:
   - Actions column in the table with a dropdown menu for each car row.
   - Edit: Opens a modal window to edit the selected car's details.
   - Delete: Opens a modal window to confirm the deletion of the car.

3. Edit Car:
   - Edit modal with pre-populated data for the selected car.
   - Disabled fields: Company, Model, VIN, Year.
   - Editable fields: Color, Price, Availability.

4. Delete Car:
   - Delete modal to confirm the deletion of the car.

5. Add Car:
   - "Add car" button to open an add modal.
   - Add modal similar to the Edit modal but with all fields enabled and empty by default.

6. Persistent Data:
   - User actions (add, edit, delete) should update the table and persist data between page reloads.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- React Bootstrap: A popular UI framework based on Bootstrap for building responsive web applications.
- Context API: A built-in state management solution in React for managing global application state.

## Getting Started

To get started with the Car Management System, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/ialtysev/car-management-system.git
   ```
3. Navigate to the project directory:
   ```
   cd manage-cars
   ```
5. Install the dependencies:
   ```
   npm install
   ```
7. Start the development server:
   ```
   npm run dev
   ```
9. Open your browser and visit `http://localhost:5173/` to access the application.

## API

The application uses the following API to fetch initial data:

API Endpoint: `https://myfakeapi.com/api/cars/`

For more details, refer to the [API documentation](https://documenter.getpostman.com/view/5596891/SW7eyRFV?version=latest#d10a962e-a3de-4c0e-9fda-7d472c20ba24).

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for new features, please open an issue or submit a pull request. Make sure to follow the project's code style and guidelines.
