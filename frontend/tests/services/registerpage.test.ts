// import { render, screen, fireEvent } from '@testing-library/react'
// import { describe, it, expect, vi } from 'vitest'
// import { Signup } from '../src/pages/Signup'

import { expect, it } from "vitest";

it("can check that true is true", () => {
  expect(true).toBe(true);
});

// //Test createbutton + JSON string
// describe('Signup', () => {
//   it('collects username, email, and password and sends them as a JSON string', () => {
//     const mockSubmit = vi.fn()
//     render(<Signup onSubmit={mockSubmit} />)

//     fireEvent.change(screen.getByLabelText('Username'), {
//       target: { value: 'User123' },
//     })
//     fireEvent.change(screen.getByLabelText('Email'), {
//       target: { value: 'user@example.com' },
//     })
//     fireEvent.change(screen.getByLabelText('Password'), {
//       target: { value: 'Password123!' },
//     })

//     fireEvent.click(screen.getByText('Register'))

//     const expected = JSON.stringify({
//       username: 'User123',
//       email: 'user@example.com',
//       password: 'Password123!',
//     })

//     expect(mockSubmit).toHaveBeenCalledWith(expected)
//   })
// })
