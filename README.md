# Answers to DOM Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
The primary differences lie in the **return type** and the **specificity** of the search:
* **`getElementById`**: Returns a **single element** that matches the unique ID string provided. It is the most performant selector.
* **`getElementsByClassName`**: Returns a **live HTMLCollection** of all elements containing the specified class name. "Live" means it updates automatically if the DOM changes.
* **`querySelector` / `querySelectorAll`**: These use **CSS selector syntax** (e.g., `.class`, `#id`). `querySelector` returns the **first** matching element, while `querySelectorAll` returns a **static NodeList** of all matches.

### 2. How do you create and insert a new element into the DOM?
To add a new element to the DOM, a two-step process is required:
1.  **Creation**: Use `document.createElement(tagName)` to generate a new node in the browser's memory.
2.  **Insertion**: Use a method like `parentElement.appendChild(newElement)` to add it as the last child, or `parentElement.insertBefore(newElement, referenceElement)` to place it in a specific position.

### 3. What is Event Bubbling? And how does it work?
**Event Bubbling** is a phase of event propagation where an event starts at the **most specific target element** (the child) and then "bubbles up" through its ancestors in the DOM tree (parent, body, html, document) until it reaches the window. 



Unless propagation is stopped, a listener on a parent element will trigger when an event occurs on one of its children.

### 4. What is Event Delegation in JavaScript? Why is it useful?
**Event Delegation** is a pattern where a single event listener is attached to a **parent element** rather than multiple listeners to individual child elements.
* **How it works**: It leverages **Event Bubbling**. When a child is clicked, the event bubbles up to the parent.
* **Utility**: It improves memory efficiency by using fewer listeners and ensures that dynamically added children automatically inherit the event behavior.

### 5. What is the difference between preventDefault() and stopPropagation() methods?
These methods serve two distinct purposes during an event:
* **`preventDefault()`**: This cancels the **default browser behavior** associated with an event (e.g., preventing a link from navigating or a form from refreshing the page).
* **`stopPropagation()`**: This stops the **propagation** of the event. It prevents the event from "bubbling" up to parent elements, ensuring that only the current listener handles the event.