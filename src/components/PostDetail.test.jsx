import { render, screen } from '@testing-library/react';
import PostDetail from './PostDetail';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Mock the child component and global fetch
vi.mock('./Comment', () => ({
    default: () => <div data-testid="mock-comment">Mock Comment</div>,
}));

beforeEach(() => {
    global.fetch = vi.fn((url) => {
        if (url.includes('comments') && !url.includes('raw_json')) {
            return Promise.resolve({
                json: () => Promise.resolve([
                    {
                        data: {
                            children: [
                                { data: { title: 'Test Post', author: 'testuser', selftext: 'Sample body', permalink: '/r/test/comments/abc123/post-title' } },
                            ],
                        },
                    },
                ]),
            });
        }

        // Return comments on second fetch
        return Promise.resolve({
            json: () => Promise.resolve([
                {},
                {
                    data: {
                        children: [
                            { data: { id: 'c1', body: 'Comment 1' } },
                            { data: { id: 'c2', body: 'Comment 2' } },
                        ],
                    },
                },
            ]),
        });
    });
});

afterEach(() => {
    vi.restoreAllMocks();
});

const renderWithRoute = (subreddit = 'test', postId = 'abc123') => {
    render(
        <MemoryRouter initialEntries={[`/r/${subreddit}/comments/${postId}`]}>
            <Routes>
                <Route path="/r/:subreddit/comments/:postId" element={<PostDetail />} />
            </Routes>
        </MemoryRouter>
    );
};

test('displays loading state initially', () => {
    renderWithRoute();
    expect(screen.getByText(/Loading post and comments/i)).toBeInTheDocument();
});

test('renders post title and author after fetch', async () => {
    renderWithRoute();
    const heading = await screen.findByText(/Test Post/i);
    expect(heading).toBeInTheDocument();
    expect(screen.getByText(/Posted by u\/testuser/i)).toBeInTheDocument();
});

test('renders comments after post loads', async () => {
    renderWithRoute();

    const comments = await screen.findAllByTestId('mock-comment');
    expect(comments.length).toBeGreaterThan(0);
});

test('shows error fallback when post fails to load', async () => {
    global.fetch = vi.fn(() => Promise.reject('Network error'));
    renderWithRoute();

    const errorMsg = await screen.findByText(/Post not found/i);
    expect(errorMsg).toBeInTheDocument();
});
  