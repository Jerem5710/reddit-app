import { render, screen } from '@testing-library/react';
import Comment from './Comment';

const baseComment = {
    data: {
        id: 'c1',
        author: 'user123',
        body: 'This is a test comment.',
        created_utc: 1710000000,
        author_icon_img: 'https://avatar.com/img.png',
        replies: {
            data: {
                children: [
                    {
                        kind: 't1',
                        data: {
                            id: 'r1',
                            author: 'replyUser',
                            body: 'This is a reply',
                            score: 10,
                            created_utc: 1710000010,
                        },
                    },
                ],
            },
        },
    },
};

describe('Comment', () => {
    it('shows skeleton if comment data is missing', () => {
        render(<Comment comment={null} />);
        expect(screen.getByText((_, el) => el?.className.includes('skeleton-avatar'))).toBeInTheDocument();
    });

    it('renders author, body and avatar', () => {
        render(<Comment comment={{ data: { ...baseComment.data, replies: null } }} />);
        expect(screen.getByText(/user123/i)).toBeInTheDocument();
        expect(screen.getByText(/This is a test comment/i)).toBeInTheDocument();
        expect(screen.getByAltText(/user123's avatar/i)).toHaveAttribute('src', expect.stringContaining('avatar.com'));
    });

    it('renders replies if present', () => {
        render(<Comment comment={baseComment} />);
        expect(screen.getByText(/replyUser/i)).toBeInTheDocument();
        expect(screen.getByText(/This is a reply/i)).toBeInTheDocument();
    });
});
