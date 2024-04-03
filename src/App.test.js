/** @jest-environment jsdom */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, queryByText } from '@testing-library/react';
import { App } from './App';

/**
 * Verify something should render
 */
test('App should render', () => {
  render(<App />);

  expect(screen.getByText('Welcome, party people!')).toBeInTheDocument();
});

test('Button should render', () => {
  render(<App />)
  const buttons = screen.getAllByRole('button')
  const themeButton = screen.getByText((text) => text.startsWith("Current theme:"))
  const showHideButton = screen.getByText((text) => text.includes("hidden content"))

  expect(buttons).toHaveLength(2)
  expect(themeButton).toBeInTheDocument()
  expect(showHideButton).toBeInTheDocument()
});

/**
 * Verify clicking button should change theme
 * hint: use fireEvent.click(element) to trigger a click event on an element
 */
test('theme button should update button text', () => {
  render(<App />)

  const themeButton = screen.getByText((text) => text.startsWith("Current theme:"))

  expect(themeButton).not.toHaveTextContent("Current theme: dark");
  fireEvent.click(themeButton)
  expect(themeButton).toHaveTextContent("Current theme: dark")
});

// BONUS
// hint: there is a `.toHaveStyle` method.
// e.g.: expect(element).toHaveStyle('color: #FFF');
test('theme button should toggle styles', () => {
  render(<App/>)
  const body = document.body
  const themeButton = screen.getByText((text) => text.startsWith("Current theme:"))
  expect(body).toHaveStyle('background-color: #fff');

  fireEvent.click(themeButton)
  expect(body).not.toHaveStyle('background-color: #fff')
});

/**
 * Verify clicking button should toggle hidden content
 *
 * hint: you can check if something does not exist by using .not
 * e.g. expect(element).not.toBeInTheDocument()
 *
 * hint: use `queryByText` instead of `getByText` to check if something is _not_ rendered
 * (getByText will throw an error if it is not rendered)
 */
test('hidden button should toggle hidden content', () => {
  render(<App />)

  const hiddenContent = screen.queryByText("This content is hidden by default")
  const showHideButton = screen.getByText((text) => text.includes("hidden content"))
  expect(hiddenContent).not.toBeInTheDocument()
  
  fireEvent.click(showHideButton)
  const visibleContent = screen.queryByText('this content is hidden by default')
  expect(visibleContent).toBeInTheDocument()
});


/**
 * Want more? Try these:
 *   - check for the presence of a specific element, like the paragraph containing the text "Click the button to toggle the theme"
 *   - check the for the class name .container on the surrounding div
 *   - after clicking the toggle hidden content button, check for the button text to update to "hide" instead of "show"
 */
