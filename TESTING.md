### Component Testing Documentation

#### 1. **CodeDialog Component Test**

**Objective**:  
Validate the rendering, interactions, and callback logic of the `CodeDialog` component.

**Test Cases**:

1. **Render Dialog with Correct Initial Content**  
   - **Description**: When the `CodeDialog` is open, check if it renders the correct initial content.
   - **Actions**:
     - Render the `CodeDialog` component with `open={true}`, passing empty functions for `onClose` and `onSave`.
     - Check if the dialog title `Add Code Block` is present.
     - Verify that width and height input fields are rendered.
     - Ensure the code input field is rendered.
   - **Expected Results**:
     - The dialog title should display "Add Code Block".
     - The width and height input fields should be displayed.
     - The code input field should be visible.

2. **Display Error When Saving Without Code**  
   - **Description**: When attempting to save without entering code, an error should be displayed.
   - **Actions**:
     - Render the `CodeDialog` component with `open={true}` and `onSave` as a mock function.
     - Click the save button.
   - **Expected Results**:
     - An error message "Please enter the code such as c, python or javascript" should be displayed.

3. **Call `onSave` with Correct Data When Valid Input is Provided**  
   - **Description**: When valid code is entered and the save button is clicked, the `onSave` callback should be called with the correct data.
   - **Actions**:
     - Render the `CodeDialog` component with `open={true}` and `onSave` as a mock function.
     - Enter valid code into the code input field and click the save button.
   - **Expected Results**:
     - The `onSave` callback should be called with the correct data.

---

#### 2. **Home Component Test**

**Objective**:  
Validate that the `Home` component renders correctly, with proper styling and content.

**Test Cases**:

1. **Render Image with Correct Attributes**  
   - **Description**: Ensure that the home page renders an image with the correct `alt` attribute and `src`.
   - **Actions**:
     - Render the `Home` component.
     - Check for the presence of an `img` element with the `alt` text "Welcome".
     - Verify that the `src` attribute of the image is `https://i.imgur.com/WMDh6CL.png`.
   - **Expected Results**:
     - The image should be displayed with the correct `alt` and `src` attributes.

2. **Render Welcome Text with Correct Styling**  
   - **Description**: Verify that the welcome text renders with the correct styling (color and padding).
   - **Actions**:
     - Render the `Home` component.
     - Check for the presence of the heading "Welcome to our Website!".
     - Ensure that the heading has the correct inline style for color and padding.
   - **Expected Results**:
     - The welcome text should be visible with the correct color (`white`) and padding (`10px 20px`).

---

#### 3. **PreCard Component Test**

**Objective**:  
Validate that the `PreCard` component renders correctly and navigates as expected when clicked.

**Test Cases**:

1. **Render PreCard Component with Correct Content**  
   - **Description**: Ensure the `PreCard` component correctly renders the `name`, `description`, and slide count.
   - **Actions**:
     - Render the `PreCard` component with the `mockPre` data as props.
     - Check if the name, description, and slide count are rendered correctly.
   - **Expected Results**:
     - The name "sdg", description "qr", and slide count "2 slides" should be displayed correctly.

2. **Navigate When Card is Clicked**  
   - **Description**: Verify that when the `PreCard` is clicked, it navigates to the correct route and stores the data in `sessionStorage`.
   - **Actions**:
     - Render the `PreCard` component, simulating a click on the card.
   - **Expected Results**:
     - The `sessionStorage` should contain the correct `pre` data, and the user should be navigated to `/presentation/{pre.id}`.

---

### UI Testing Documentation (using Cypress)

**Objective**:  
Test the entire application’s user interactions and workflows to ensure that the app behaves correctly for users. This includes testing user registration, presentation creation, updating names and thumbnails, and deletion.

**Test Cases**:

1. **User Registration Workflow**  
   - **Description**: Test the user registration functionality to ensure that the user can successfully register with valid inputs.
   - **Actions**:
     - Visit the homepage and click "Sign Up".
     - Fill in the email, username, password, and confirm password fields, then submit the form.
   - **Expected Results**:
     - The page should display "Register Successfully!" after the registration process.

2. **Create a New Presentation**  
   - **Description**: Test the ability to create a new presentation and ensure that the dialog closes and the new presentation appears.
   - **Actions**:
     - Click the "New" button, fill in the name and description of the presentation, and click the "Create" button.
   - **Expected Results**:
     - The dialog "Create New Presentations" should close, and the new presentation should appear in the list with the correct name.

3. **Modify Presentation Name**  
   - **Description**: Test the ability to modify the name of an existing presentation.
   - **Actions**:
     - Click on a presentation card, then click the "Modify Name" button.
     - Change the presentation name and submit the form.
   - **Expected Results**:
     - The presentation name should be updated on the page.

4. **Upload Thumbnail**  
   - **Description**: Test the thumbnail upload functionality to ensure that a valid image can be uploaded.
   - **Actions**:
     - Click the "Upload Thumbnail" button, enter a valid image URL, and submit the form.
   - **Expected Results**:
     - The thumbnail should be uploaded and displayed correctly.

5. **Create and Switch Between Slides**  
   - **Description**: Test the ability to create new slides and switch between them.
   - **Actions**:
     - Click the "Create Slide" button to create new slides, then switch between slides using the left and right arrows.
   - **Expected Results**:
     - New slides should be created, and the user should be able to switch between slides successfully.

6. **Delete Presentation**  
   - **Description**: Test the functionality to delete a presentation.
   - **Actions**:
     - Click the delete button, confirm the deletion, and ensure that the presentation is removed.
   - **Expected Results**:
     - The presentation should be deleted, and the user should be redirected to the `/dashboard` page.

7. **User Logout and Re-login**  
   - **Description**: Test the logout and re-login functionality.
   - **Actions**:
     - Click the logout button, confirm the logout, and verify that the page redirects to the homepage.
     - Re-login with valid credentials and verify that the user is successfully logged in.
   - **Expected Results**:
     - The user should be logged out and redirected to the homepage, then successfully logged back in.

These component and UI tests ensure that the frontend application’s components and overall user interactions behave as expected and are reliable for users.