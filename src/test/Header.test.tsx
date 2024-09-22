import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import Header from "../components/Header/Header";
import { ThemeProvider } from "../context/ThemeContext";
import { GITHUB_PROFILE_URL } from '../utils/constants'

describe('Header', () => {
    afterEach(cleanup)

    it('should have the correct href for GitHub profile', () => {
        render(
            <ThemeProvider>
                <Header onMenuClick={() => { }} isMenuOpen={false} />
            </ThemeProvider>
        )

        const githubLink = screen.getByRole('link');

        expect(githubLink).toBeDefined();
        expect(githubLink.getAttribute('href')).toBe(GITHUB_PROFILE_URL)
        expect(githubLink.getAttribute('target')).toBe('_blank')

        console.log(githubLink.getAttributeNames())
        console.log('href --> ', githubLink.getAttribute('href'))
        console.log('target -->', githubLink.getAttribute('target'))
    })


    it('should call onMenuClick when the menu icon is clicked', () => {
        const handleMenuClick = vi.fn();

        render(
            <ThemeProvider>
                <Header onMenuClick={handleMenuClick} isMenuOpen={false} />
            </ThemeProvider>
        )

        const menuIcon = screen.getByLabelText(/open-menu/i);
        fireEvent.click(menuIcon);

        expect(handleMenuClick).toHaveBeenCalled();
    })

    it('should call onMenuClick when the close icon is clicked', () => {
        const handleMenuClick = vi.fn();

        render(
            <ThemeProvider>
                <Header onMenuClick={handleMenuClick} isMenuOpen={true} />
            </ThemeProvider>
        )

        const closeIcon = screen.getByLabelText(/close-menu/i);
        fireEvent.click(closeIcon);

        expect(handleMenuClick).toHaveBeenCalled();
    })

    it('should render the menu icon when isMenuOpen is false', () => {
        render(
            <ThemeProvider>
                <Header onMenuClick={() => {}} isMenuOpen={false} />
            </ThemeProvider>
        )

        // Verifica que el icono de menú está presente
        expect(screen.getByLabelText(/open-menu/i)).toBeDefined();
        expect(screen.queryByLabelText(/close-menu/i)).toBeNull();
    })

    it('should render the close icon when isMenuOpen is true', () => {
        render(
            <ThemeProvider>
                <Header onMenuClick={() => {}} isMenuOpen={true} />
            </ThemeProvider>
        )

        // Verifica que el icono de cerrar está presente
        expect(screen.getByLabelText(/close-menu/i)).toBeDefined();
        expect(screen.queryByLabelText(/open-menu/i)).toBeNull();
    })
})