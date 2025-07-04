import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TopBar from './TopBar';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore([]);
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});
  

describe('TopBar component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            subreddit: { selectedSubreddit: 'reactjs' },
        });
        store.dispatch = vi.fn();
    });

    test('renders the title and logo', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <TopBar />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Reddit Client/i)).toBeInTheDocument();
        expect(screen.getByAltText(/Reddit Logo/i)).toBeInTheDocument();
    });

    test('updates the input value and dispatches subreddit on submit', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <TopBar />
                </MemoryRouter>
            </Provider>
        );

        const input = screen.getByPlaceholderText(/Enter subreddit/i);
        fireEvent.change(input, { target: { value: 'webdev' } });
        fireEvent.submit(input.closest('form'));

        expect(store.dispatch).toHaveBeenCalledWith({
            type: 'subreddit/setSelectedSubreddit',
            payload: 'webdev',
        });

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
