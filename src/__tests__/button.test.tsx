import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '@/app/components/button/button';

describe('renders button with name', () => {
  it('should render button with name', () => {
    render(<Button name='test-name' type='button' />);
    expect(screen.getByText('test-name')).toBeInTheDocument();
  });

  it("handles onClick event", () => {
    const handleClick = jest.fn();
    render(<Button name='test-name' type='button' onClick={handleClick} />);
    screen.getByText('test-name').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("Shows pending state correctly", () => {
    render(<Button
      name='Submit'
      type='submit'
      isPending={true}
      pendingName='Loading...' />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
  });

  it("applies danger style when danger prop is true", () => {
    render(<Button
      name='Delete'
      type='button'
      danger={true}
    />)
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-red-500');
  })

  it("applies disabled style when pending is true", () => {
    render(<Button
      name='Delete'
      type='button'
      isPending={true}
    />)
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('bg-gray-300');
  })

  it('renders with icon when provided', () => {
    const mockIcon = <span data-testid="test-icon">🔍</span>;
    render(<Button name="Search" type="button" icon={mockIcon} />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it("renders spinner when isPending is true", () => {
    render(<Button
      name='Submit'
      type='submit'
      isPending={true}
    />)
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  })

  it('does not render spinner when isPending is false', () => {
    render(<Button
      name='Submit'
      type='submit'
      isPending={false}
    />)
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('shows spinner and panding tesxt together', () => {
    render(<Button
      name='Submit'
      type='submit'
      isPending={true}
      pendingName='Loading...'
    />)
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
  })
})