import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import { describe, it, beforeEach, vi, expect } from 'vitest'

describe('App', () => {
    beforeEach(() => {
        globalThis.open = vi.fn()
    })

    it('renders heading, paragraph, and button', () => {
        render(<App />)

        expect(screen.getByText(/React Project Setup/i)).toBeInTheDocument()
        expect(screen.getByText(/Kickstart your next big idea/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument()
    })

    it('opens the GitHub link in a new tab on button click', () => {
        render(<App />)

        const button = screen.getByRole('button', { name: /Get Started/i })
        fireEvent.click(button)

        expect(globalThis.open).toHaveBeenCalledWith('https://github.com/Harshit-Bafna/React-Project-Setup', '_blank')
    })
})
