import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchInput from '@/components/SearchInput';
import { useApiServices } from '@/hooks/useApiServices';
import { GenresProvider } from '@/context/genres.context';

jest.mock('@/hooks/useApiServices');

const mockUseApiServices = useApiServices as jest.MockedFunction<typeof useApiServices>;

describe('SearchInput', () => {
    const mockHandleFavorites = jest.fn();

    beforeEach(() => {
        mockUseApiServices.mockReturnValue({
            request: {
                get: jest.fn().mockResolvedValue({
                    data: {
                        results: [
                            { id: 1, title: 'Movie 1', genre_ids: [28], release_date: '2021-01-01' },
                            { id: 2, title: 'Movie 2', genre_ids: [12], release_date: '2021-02-01' },
                        ],
                    },
                }),
            },
        });
    });

    it('renders search input', () => {
        render(
            <GenresProvider>
                <SearchInput handleFavorites={mockHandleFavorites} />
            </GenresProvider>
        );
        const inputElement = screen.getByPlaceholderText(/Ex: Star Wars/i);
        expect(inputElement).toBeInTheDocument();
    });

    it('fetches and displays suggestions', async () => {
        render(
            <GenresProvider>
                <SearchInput handleFavorites={mockHandleFavorites} />
            </GenresProvider>
        );
        const inputElement = screen.getByPlaceholderText(/Ex: Star Wars/i);
        fireEvent.change(inputElement, { target: { value: 'Movie' } });

        const suggestions = await screen.findAllByText(/Movie/i);
        expect(suggestions).toHaveLength(2);
    });

    it('handles autocomplete suggestion', async () => {
        render(
            <GenresProvider>
                <SearchInput handleFavorites={mockHandleFavorites} />
            </GenresProvider>
        );
        const inputElement = screen.getByPlaceholderText(/Ex: Star Wars/i);

        fireEvent.change(inputElement, { target: { value: 'Mov' } });
        await waitFor(() => {
            const autocompleteInput = screen.getByDisplayValue(/Movie 1/i);
            expect(autocompleteInput).toBeInTheDocument();
        });
    });

    it('handles favorite selection with space key', async () => {
        render(
            <GenresProvider>
                <SearchInput handleFavorites={mockHandleFavorites} />
            </GenresProvider>
        );
        const inputElement = screen.getByPlaceholderText(/Ex: Star Wars/i);

        fireEvent.change(inputElement, { target: { value: 'Movie' } });
        await screen.findAllByText(/Movie/i);

        fireEvent.keyDown(inputElement, { key: 'ArrowDown' });
        fireEvent.keyDown(inputElement, { code: 'Space' });

        expect(mockHandleFavorites).toHaveBeenCalledWith(1);
    });

    it('clears suggestions when input is empty', async () => {
        render(
            <GenresProvider>
                <SearchInput handleFavorites={mockHandleFavorites} />
            </GenresProvider>
        );
        const inputElement = screen.getByPlaceholderText(/Ex: Star Wars/i);

        fireEvent.change(inputElement, { target: { value: 'Movie' } });
        await screen.findAllByText(/Movie/i);

        fireEvent.change(inputElement, { target: { value: '' } });
        expect(screen.queryByText('Movie 1')).not.toBeInTheDocument();
    });
});