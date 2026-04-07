'use client';

type ToastInput = {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
};

export function useToast() {
  return {
    toast: ({ title, description, variant = 'default' }: ToastInput) => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('app-toast', {
            detail: { title, description, variant },
          })
        );
      }

      const message = description ? `${title}: ${description}` : title;

      if (variant === 'destructive') {
        console.error(message);
        return;
      }

      console.info(message);
    },
  };
}
