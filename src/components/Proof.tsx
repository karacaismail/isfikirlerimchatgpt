import { useEffect, useRef, useState } from 'react';
import {
  Button,
  MantineProvider,
  Modal,
  Select,
  TextInput,
  createTheme,
} from '@mantine/core';
import '@mantine/core/styles.layer.css';

export const theme = createTheme({
  fontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  headings: {
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  primaryColor: 'decision',
  colors: {
    decision: [
      '#edf1fa',
      '#dde5f7',
      '#b8c8ee',
      '#92abe6',
      '#6f8ddd',
      '#4e70d4',
      '#385bc9',
      '#2d4fc1',
      '#2845ab',
      '#203c9a',
    ],
  },
  fontSizes: {
    xs: '1rem',
    sm: '1rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  focusClassName: 'focus-ring',
  defaultRadius: 'sm',
  components: {
    Button: Button.extend({ defaultProps: { size: 'md', radius: 'sm' } }),
    TextInput: TextInput.extend({ defaultProps: { size: 'md' } }),
    Select: Select.extend({
      defaultProps: { size: 'md', rightSection: null, withCheckIcon: false },
    }),
  },
});
export default function Proof() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const opener = useRef<HTMLButtonElement>(null);
  useEffect(() => setReady(true), []);
  return (
    <MantineProvider theme={theme} forceColorScheme="light">
      <div className="stack proof" data-ready={ready}>
        <TextInput
          disabled={!ready}
          label="Deneme metni"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <Select
          disabled={!ready}
          label="Deneme seçimi"
          data={['Gelir', 'Yayılma']}
          placeholder="Bir ölçüt seçin"
        />
        <Button disabled={!ready} ref={opener} onClick={() => setOpen(true)}>
          Deneme penceresini aç
        </Button>
        <Modal
          opened={open}
          onClose={() => setOpen(false)}
          title="Teknik deneme"
          withCloseButton={false}
          returnFocus={false}
          onExitTransitionEnd={() => opener.current?.focus()}
        >
          <p>Girilen metin: {value || 'Henüz girilmedi'}</p>
          <Button onClick={() => setOpen(false)}>Pencereyi kapat</Button>
        </Modal>
      </div>
    </MantineProvider>
  );
}
