# Range Component

This project contains a custom range component developed using Next.js and TypeScript.

## Exercise Overview

The component `<Range />` has two main usage modes:

### Normal Range

`localhost:8080/exercise1`

- Custom range component with draggable handles.
- Users can set new values by dragging the handles or clicking on the minimum and maximum number labels.
- Values are constrained within the specified minimum and maximum input values.
- Hovering over handles enlarges them and changes the cursor type.
- Dragging a handle changes the cursor to indicate dragging.
- Minimum and maximum values cannot be crossed.
- Mocked HTTP service provides minimum and maximum values for the component.

### Fixed Values Range

`localhost:8080/exercise2`

- Custom range component with fixed range of values [1.99, 5.99, 10.99, 30.99, 50.99, 70.99].
- Users can only select values within the fixed range.
- Mocked HTTP service returns the fixed array of numbers.
- Currency values are not changeable; they are displayed as labels.
- Users can drag two handles along the range line.
- Minimum and maximum values cannot be crossed.
- Mocked service provides range values for the component.
