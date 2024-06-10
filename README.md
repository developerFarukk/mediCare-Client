
# Website Name: MediCare

Welcome to MediCare, a comprehensive platform for managing and purchasing medicines seamlessly. This application provides a user-friendly interface for users and powerful administrative tools for managing the system.


## Live Site URL
![PropIT LOgo](/src/assets//Rgister//RegisterImg.png)
[Visit MediCare](https://medicare-2059.web.app)
[Visit MediCare](https://medicare-2059.firebaseapp.com)

## Features

1. **User Authentication**: Secure login and registration using Firebase authentication to protect user data.
2. **Medicine Browsing**: Browse through a wide range of medicines with detailed information including name, company, price per unit, and quantity.
3. **Cart Management**: Easily add, remove, or update the quantity of medicines in the cart.
4. **Checkout Process**: Seamless checkout process integrated with Stripe for secure payments.
5. **Order Tracking**: Real-time updates and notifications for order statuses to keep users informed.
6. **Profile Management**: Users can view and update their profile information.
7. **Admin Dashboard**: Comprehensive dashboard for admins to view total sales revenue, paid and pending payments.
8. **Data Export**: Admins can export sales data to CSV, Excel, PDF, and DOCX formats for detailed reporting.
9. **Responsive Design**: Fully responsive design ensuring usability across all devices from desktops to mobile phones.
10. **Email Notifications**: Automated email notifications for order confirmations and updates.
11. **Analytics and Reports**: Detailed analytics and sales reports for better business insights.


## Technologies Used

- **React**: For building the user interface.
- **Tailwind CSS**: For styling the application.
- **Firebase**: For authentication and real-time database management.
- **Stripe**: For handling secure payments.
- **Axios**: For making HTTP requests.
- **TanStack React Query**: For efficient data fetching and state management.
- **DaisyUI**: For UI components.
- **SweetAlert2**: For attractive alert messages.
- **React Hook Form**: For managing form inputs and validation.
- **React Table**: For creating and managing tables efficiently.

## Installation

To get started with the project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone github-repo-link
    cd medicare-client
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    - Create a `.env` file in the root of your project.
    - Add the necessary environment variables (Firebase configuration, Stripe keys, etc.).

4. **Run the development server**:
    ```bash
    npm run dev
    ```

5. **Build for production**:
    ```bash
    npm run build
    ```

6. **Preview the production build**:
    ```bash
    npm run preview
    ```

7. **Lint the code**:
    ```bash
    npm run lint
    ```

Now, you should be able to see the application running locally.

## Scripts

- `dev`: Starts the development server.
- `build`: Builds the project for production.
- `lint`: Lints the project files.
- `preview`: Previews the production build.