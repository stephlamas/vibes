import React from 'react';
import { render, screen } from '@testing-library/react';
import { GenericModal } from '../GenericModal';

interface TestModalProps {
  open: boolean;
  children?: any;
  footerContent?: any;
}

const TITLE = 'Test Modal';
const MODAL_CONTENT = 'Modal Content';
const renderModal = ({ open, children, footerContent }: TestModalProps) => {
  const onClose = jest.fn();
  render(
    <GenericModal
      open={open}
      onClose={onClose}
      title={TITLE}
      footerContent={footerContent}
    >
      {children}
    </GenericModal>,
  );
};

describe('GenericModal', () => {
  it('renders when open is set to true', async () => {
    renderModal({ open: true, children: MODAL_CONTENT });

    expect(screen.getByText(TITLE)).toBeInTheDocument();
    expect(screen.getByText(MODAL_CONTENT)).toBeInTheDocument();
  });
  it('does not render when open is set to false', async () => {
    renderModal({ open: false, children: MODAL_CONTENT });

    expect(screen.queryByText(MODAL_CONTENT)).not.toBeInTheDocument();
    expect(screen.queryByText(TITLE)).not.toBeInTheDocument();
  });
  it('renders the title', async () => {
    renderModal({ open: true });

    expect(screen.getByRole('heading', { name: TITLE })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'close' })).toBeInTheDocument();
  });

  it('renders the footer content', () => {
    const footerContent = <div>Footer Content</div>;

    renderModal({
      open: true,
      children: MODAL_CONTENT,
      footerContent,
    });

    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });
});