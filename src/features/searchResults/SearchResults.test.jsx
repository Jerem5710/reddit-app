import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

const createRender = (searchQuery, posts = []) => {
    const store = mockStore({
        posts: {
            posts,
        },
    });

    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={[`/search?q=${searchQuery}`]}>
                <SearchResults />
            </MemoryRouter>
        </Provider>
    );
};

describe('SearchResults', () => {
    it('renders heading for search term', () => {
        createRender('react');

        expect(screen.getByText(/Results for "react"/i)).toBeInTheDocument();
    });

    it('displays loading message initially', () => {
        createRender('react');

        expect(screen.getByText(/Searching posts/i)).toBeInTheDocument();
    });

    it('renders matching post when title includes query', async () => {
        const posts = [
            { id: '1', title: 'React is awesome', subreddit: 'webdev' },
            { id: '2', title: 'Vue vs Angular', subreddit: 'frontend' },
        ];

        createRender('react', posts);

        // Wait for post to appear after the simulated loading delay
        const result = await screen.findByText(/React is awesome/i);
        expect(result).toBeInTheDocument();
    });

    it('shows message when no posts match query', async () => {
        const posts = [
            { id: '1', title: 'Svelte is cool', subreddit: 'javascript' },
        ];

        createRender('banana', posts);

        const msg = await screen.findByText(/No results found/i);
        expect(msg).toBeInTheDocument();
    });

    it('always renders back to feed link', async () => {
        const posts = [
            { id: '1', title: 'React!', subreddit: 'reactjs' },
        ];

        createRender('react', posts);

        const link = await screen.findByRole('link', { name: /Back to Feed/i });
        expect(link).toHaveAttribute('href', '/');
    });
});
