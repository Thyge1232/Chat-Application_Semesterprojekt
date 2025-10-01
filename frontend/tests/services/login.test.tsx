/* //her tester vi at loginformen omsættes korrekt til json format

import { describe, it, expect, vi } from 'vitest';
// import { render, screen, fireEvent } from '@testing-library/react';

describe('LoginForm', () => {
  const testCases = [
    ['user123', 'securePass'], // valid credentials
    ['', ''], // empty fields
    ['admin', 'p@$$w0rd!&'], // special characters
    ['verylongusername_exceeding_typical_limits', 'thisisaverylongpasswordthatexceedstypicallengthsbutshouldstillwork'], // long input strings
  ];

  it.each(testCases)(
    'submits credentials: username="%s", password="%s"',
    (username, password) => {
      const mockLogin = vi.fn();
      // render(<LoginForm onLogin={mockLogin} />);

      fireEvent.change(screen.getByLabelText(/username/i), {
        target: { value: username },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: password },
      });
      fireEvent.click(screen.getByRole('button', { name: /login/i }));

      expect(mockLogin).toHaveBeenCalledWith(username, password);
    }
  );
});

/*Next Steps in TDD (from your current point)
1. 	Create the  component shell
• 	A functional React component that renders something (even just a  at first).
• 	Export it so your test can import it.
2. 	Add the required form elements one by one
• 	First add a  and  for username.
• 	Then add a  and  for password.
• 	Finally, add a  with the text “Login”.
• 	Each time, re-run your test — it will fail until the element exists, then pass once it’s there.
3. 	Wire up state and interactivity
• 	Introduce  for username and password.
• 	Connect the  and  props so typing updates state.
• 	Your test will now pass the “change input” steps.
4. 	Handle submission
• 	Add a  or  handler for the button.
• 	Inside, call the  prop with the current username and password.
• 	This is the point where your test’s  will finally pass.
5. 	Refactor and extend
• 	Once the happy path works, you can add validation, error messages, and loading states — each driven by new failing tests.

🧱 React Elements That Must Exist
• 	Two labeled inputs: one for username, one for password.
• 	A login button: accessible by role and label.
• 	State hooks: to hold the input values.
• 	Submit handler: that calls the provided  function.
That’s the minimal set needed to satisfy your current test suite.

🔄 Where Should the Login Logic Live?
For a chat application, it’s not typical to put the actual database call directly inside . Instead:
• 	: purely UI + form state. It collects credentials and calls a callback () when submitted.
• 	 (or similar): contains the async function that talks to your backend (e.g.  that awaits a server response).
• 	Page or container component (e.g. ): renders , passes in the  handler, and decides what to do with the result (e.g. navigate to the landing page on success, show error on failure).
This separation keeps your form component testable and focused, while the actual login logic (API call, database validation, token handling) lives in a dedicated service layer.

🧠 Why This Matters
• 	TDD discipline: You only add code when a test demands it.
• 	Separation of concerns: UI handles inputs, services handle data, pages handle navigation.
• 	Scalability: Later, you can swap out the backend or add OAuth without rewriting your form. */
