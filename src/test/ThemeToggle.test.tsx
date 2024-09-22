import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { ThemeProvider } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";

describe('ThemeToggle', () => {
    afterEach(cleanup)

    it('should render component', () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        )

        expect(<ThemeToggle />).toBeDefined()
    })

    it('should toggle between light and dark themes', () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        )

        const toggleButton = screen.getByRole('checkbox')

        expect(toggleButton).toBeDefined()
        screen.debug(toggleButton)

        expect(toggleButton).toBeInstanceOf(HTMLInputElement)

        if (toggleButton instanceof HTMLInputElement) {
            expect(toggleButton.checked).toBe(false)
            console.log('isDarkMode? --> ', toggleButton.checked);

            fireEvent.click(toggleButton)
            console.log('fireEvent.click(toggleButton) has been clicked');

            expect(toggleButton.checked).toBe(true)
            console.log('isDarkMode? --> ', toggleButton.checked);

        } else {
            throw new Error('toggleButton is not  an HTMLInputElement')
        }
    })
})