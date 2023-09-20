import { render, screen } from '@testing-library/react';
import { LandingPage } from "../LandingPage";
//import '@testing-library/jest-dom/extend-expect';

describe('LandingPage', () => { 
    it('renders the landing page', () => {
        render(<LandingPage />);
        expect(screen.getByText('VIBES')).toBeInTheDocument();
        expect(screen.getByText('Login with Spotify')).toBeInTheDocument();
    });
});
