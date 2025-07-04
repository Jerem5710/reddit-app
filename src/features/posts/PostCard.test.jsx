import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PostCard from './PostCard';

const basePost = {
    id: 'abc123',
    title: 'A test post',
    subreddit: 'reactjs',
    subreddit_name_prefixed: 'r/reactjs',
    score: 42,
    num_comments: 10,
    created_utc: 1639012345,
    permalink: '/r/reactjs/comments/abc123/test_post',
    sr_detail: { icon_img: '' },
};

describe('PostCard', () => {
    it('renders post title and comment count', () => {
        render(
            <MemoryRouter>
                <PostCard post={basePost} />
            </MemoryRouter>
        );

        expect(screen.getByText(/A test post/i)).toBeInTheDocument();
        expect(screen.getByText(/10/)).toBeInTheDocument(); // num_comments
    });

    it('renders image if preview image exists', () => {
        const postWithImage = {
            ...basePost,
            preview: {
                images: [
                    {
                        source: {
                            url: 'https://example.com/image.jpg',
                        },
                    },
                ],
            },
        };

        render(
            <MemoryRouter>
                <PostCard post={postWithImage} />
            </MemoryRouter>
        );

        expect(screen.getByAltText(/A test post/)).toHaveAttribute(
            'src',
            'https://example.com/image.jpg'
        );
    });

    it('renders video if reddit_video exists', () => {
        const postWithVideo = {
            ...basePost,
            media: {
                reddit_video: {
                    fallback_url: 'https://video.example.com/vid.mp4',
                },
            },
        };

        render(
            <MemoryRouter>
                <PostCard post={postWithVideo} />
            </MemoryRouter>
        );

        expect(screen.getByLabelText(/Video for post/i)).toBeInTheDocument(); // fallback: you can also use .querySelector('video')
    });
});

