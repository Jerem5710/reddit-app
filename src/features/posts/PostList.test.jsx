import { render, screen } from '@testing-library/react';
import PostList from './PostList';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import * as postsSlice from './postsSlice';
vi.spyOn(postsSlice, 'fetchPosts').mockReturnValue({ type: 'posts/fetch' });

const mockStore = configureStore([]);

describe('PostList', () => {
    it('shows loading message when status is loading', () => {
        const store = mockStore({
            subreddit: { selectedSubreddit: 'reactjs' },
            posts: { posts: [], status: 'loading', error: null },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PostList />
                </MemoryRouter>
            </Provider>

        );

        expect(screen.getByText(/Loading posts/i)).toBeInTheDocument();
    });

    it('shows error message when status is failed', () => {
        const store = mockStore({
            subreddit: { selectedSubreddit: 'reactjs' },
            posts: { posts: [], status: 'failed', error: 'Something went wrong' },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PostList />
                </MemoryRouter>
            </Provider>

        );

        expect(screen.getByText(/Error: Something went wrong/i)).toBeInTheDocument();
    });

    it('renders posts and subreddit title when loaded', () => {
        const store = mockStore({
            subreddit: { selectedSubreddit: 'reactjs' },
            posts: {
                posts: [{ id: '1', title: 'Sample Post' }],
                status: 'succeeded',
                error: null,
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PostList />
                </MemoryRouter>
            </Provider>

        );

        expect(screen.getByText(/Posts from r\/reactjs/i)).toBeInTheDocument();
        expect(screen.getByText(/Sample Post/i)).toBeInTheDocument();
    });

    it('dispatches fetchPosts when subreddit changes', () => {
        const fetchPostsMock = vi.spyOn(postsSlice, 'fetchPosts').mockReturnValue({ type: 'posts/fetch' });

        const store = mockStore({
            subreddit: { selectedSubreddit: 'reactjs' },
            posts: { posts: [], status: 'succeeded', error: null },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <PostList />
                </MemoryRouter>
            </Provider>

        );

        expect(fetchPostsMock).toHaveBeenCalledWith('reactjs');
        fetchPostsMock.mockRestore();
    });
});
