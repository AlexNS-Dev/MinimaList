import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import Header from "../components/Header/Header";
import { ThemeProvider } from "../context/ThemeContext";
import { GITHUB_PROFILE_URL } from '../utils/constants'

describe('ThemeToggle', () => {
    afterEach(cleanup)

    it('should have the correct href for GitHub profile', () => {
        render(
            <ThemeProvider>
                <Header onMenuClick={() => {}} isMenuOpen={false} />
            </ThemeProvider>
        )

        const githubLink = screen.getByRole('link')
        expect(githubLink.getAttribute('href')).toBe(GITHUB_PROFILE_URL)
        expect(githubLink.getAttribute('target')).toBe('_blank')
        
        console.log(githubLink.getAttributeNames())
        console.log('href --> ', githubLink.getAttribute('href'))
        console.log('target -->', githubLink.getAttribute('target'))
    })
})